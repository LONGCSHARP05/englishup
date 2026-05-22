import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Highlighter,
  List,
  Moon,
  Plus,
  Settings,
  Sun,
  Type,
  Volume2,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { mockBooks, mockBookPages, mockVocabulary } from "@/mock";
import { useBookStore, type Bookmark as BookmarkType } from "@/store/useBookStore";
import { useVocabStore } from "@/store/useVocabStore";
import { toast } from "sonner";

export const Route = createFileRoute("/books/$bookId")({
  head: ({ params }) => ({
    meta: [
      { title: "Doc sach — EnglishUp" },
      { name: "description", content: `Doc sach ${params.bookId} voi trai nghiem page flip.` },
    ],
  }),
  component: BookReaderPage,
});

type Theme = "light" | "cream" | "dark";

function BookReaderPage() {
  const { bookId } = Route.useParams();
  const navigate = useNavigate();

  const book = useMemo(() => mockBooks.find((b) => b.id === bookId), [bookId]);
  const pages = useMemo(() => mockBookPages[bookId] || [], [bookId]);

  const {
    setCurrentPage,
    getProgress,
    addBookmark,
    removeBookmark,
    getBookmarks,
    addHighlight,
    isBookUnlocked,
  } = useBookStore();

  const addVocab = useVocabStore((s) => s.addWord);
  const vocabWords = useVocabStore((s) => s.vocab);

  const savedProgress = getProgress(bookId);
  const [currentPage, setPage] = useState(savedProgress?.currentPage ?? 1);
  const [theme, setTheme] = useState<Theme>("cream");
  const [fontSize, setFontSize] = useState(16);
  const [pageInputValue, setPageInputValue] = useState("");
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"left" | "right">("right");

  const contentRef = useRef<HTMLDivElement>(null);
  const bookmarks = getBookmarks(bookId);

  // Resume reading toast
  useEffect(() => {
    if (savedProgress && savedProgress.currentPage > 1) {
      toast.info(`Tiep tuc tu trang ${savedProgress.currentPage}?`, {
        action: {
          label: "OK",
          onClick: () => {},
        },
      });
    }
  }, []);

  // Save progress on page change
  useEffect(() => {
    if (book) {
      setCurrentPage(bookId, currentPage, book.totalPages);
    }
  }, [currentPage, bookId, book, setCurrentPage]);

  // Handle text selection for highlighting
  useEffect(() => {
    function handleSelection() {
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed && selection.toString().trim()) {
        setSelectedText(selection.toString().trim());
      } else {
        setSelectedText(null);
      }
    }
    document.addEventListener("mouseup", handleSelection);
    return () => document.removeEventListener("mouseup", handleSelection);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" && currentPage > 1) {
        flipPage("left");
      } else if (e.key === "ArrowRight" && currentPage < pages.length) {
        flipPage("right");
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentPage, pages.length]);

  const flipPage = useCallback(
    (direction: "left" | "right") => {
      if (isFlipping) return;
      setIsFlipping(true);
      setFlipDirection(direction);

      setTimeout(() => {
        if (direction === "right" && currentPage < pages.length) {
          setPage(currentPage + 1);
        } else if (direction === "left" && currentPage > 1) {
          setPage(currentPage - 1);
        }
        setIsFlipping(false);
      }, 300);
    },
    [currentPage, pages.length, isFlipping]
  );

  function handlePageJump() {
    const pageNum = parseInt(pageInputValue);
    if (pageNum >= 1 && pageNum <= pages.length) {
      setPage(pageNum);
      setPageInputValue("");
    }
  }

  function handleAddBookmark(color: BookmarkType["color"]) {
    const existingBookmark = bookmarks.find((b) => b.page === currentPage);
    if (existingBookmark) {
      toast.info("Trang nay da duoc danh dau");
      return;
    }
    addBookmark(bookId, currentPage, color);
    toast.success("Da them danh dau");
  }

  function handleHighlight(color: "yellow" | "green" | "pink" | "blue") {
    if (!selectedText) return;
    addHighlight(bookId, currentPage, selectedText, color);
    toast.success("Da luu highlight");
    window.getSelection()?.removeAllRanges();
    setSelectedText(null);
  }

  function handleWordLookup(word: string) {
    setSelectedWord(word);
  }

  const isCurrentPageBookmarked = bookmarks.some((b) => b.page === currentPage);

  if (!book) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
        <BookOpen className="h-12 w-12 text-muted-foreground" />
        <h2 className="font-display text-xl font-semibold">Khong tim thay sach</h2>
        <Button asChild>
          <Link to="/books">Quay lai thu vien</Link>
        </Button>
      </div>
    );
  }

  // Check if premium and not unlocked
  if (book.isPremium && !isBookUnlocked(bookId)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
        <BookOpen className="h-12 w-12 text-amber" />
        <h2 className="font-display text-xl font-semibold">Sach Premium</h2>
        <p className="text-muted-foreground">Ban can mo khoa sach nay de doc</p>
        <Button asChild>
          <Link to="/books">Quay lai thu vien</Link>
        </Button>
      </div>
    );
  }

  const currentPageData = pages[currentPage - 1];
  const themeClasses: Record<Theme, string> = {
    light: "bg-white text-foreground",
    cream: "bg-[#F5F0E8] text-[#3D3929]",
    dark: "bg-[#1a1a18] text-[#E0DCD4]",
  };

  return (
    <div className={`flex min-h-screen flex-col ${themeClasses[theme]}`}>
      {/* Top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border/20 bg-inherit px-3 py-2 backdrop-blur sm:px-4">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="gap-1.5 text-xs"
        >
          <Link to="/books">
            <ArrowLeft className="h-4 w-4" /> Thu vien
          </Link>
        </Button>

        <h1 className="hidden max-w-[200px] truncate text-center font-display text-sm font-medium sm:block">
          {book.title}
        </h1>

        <div className="flex items-center gap-1.5">
          {/* Page number with jump */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="rounded-md px-2 py-1 text-xs hover:bg-muted/50">
                Trang {currentPage} / {pages.length}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-3">
              <div className="flex gap-2">
                <Input
                  type="number"
                  min={1}
                  max={pages.length}
                  placeholder="Trang"
                  value={pageInputValue}
                  onChange={(e) => setPageInputValue(e.target.value)}
                  className="h-8 text-sm"
                  onKeyDown={(e) => e.key === "Enter" && handlePageJump()}
                />
                <Button size="sm" onClick={handlePageJump}>
                  Go
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Bookmark button */}
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={`rounded-md p-1.5 transition-colors hover:bg-muted/50 ${
                  isCurrentPageBookmarked ? "text-coral" : ""
                }`}
                aria-label="Danh dau"
              >
                <Bookmark className={`h-4 w-4 ${isCurrentPageBookmarked ? "fill-current" : ""}`} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-36 p-2">
              <p className="mb-2 text-xs font-medium">Chon mau:</p>
              <div className="flex gap-2">
                {(["red", "blue", "yellow", "green"] as const).map((color) => (
                  <button
                    key={color}
                    onClick={() => handleAddBookmark(color)}
                    className={`h-6 w-6 rounded-full transition-transform hover:scale-110 ${
                      color === "red"
                        ? "bg-red-500"
                        : color === "blue"
                          ? "bg-blue-500"
                          : color === "yellow"
                            ? "bg-yellow-400"
                            : "bg-green-500"
                    }`}
                    aria-label={`Bookmark ${color}`}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Bookmarks sheet */}
          <Sheet open={showBookmarks} onOpenChange={setShowBookmarks}>
            <SheetTrigger asChild>
              <button className="rounded-md p-1.5 transition-colors hover:bg-muted/50" aria-label="Danh sach danh dau">
                <List className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 sm:w-80">
              <SheetHeader>
                <SheetTitle>Danh dau ({bookmarks.length})</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-2">
                {bookmarks.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    Chua co danh dau nao
                  </p>
                ) : (
                  bookmarks.map((bm) => (
                    <div
                      key={bm.id}
                      className="flex items-center justify-between rounded-lg border border-border p-2"
                    >
                      <button
                        onClick={() => {
                          setPage(bm.page);
                          setShowBookmarks(false);
                        }}
                        className="flex items-center gap-2 text-left text-sm hover:underline"
                      >
                        <span
                          className={`h-3 w-3 rounded-full ${
                            bm.color === "red"
                              ? "bg-red-500"
                              : bm.color === "blue"
                                ? "bg-blue-500"
                                : bm.color === "yellow"
                                  ? "bg-yellow-400"
                                  : "bg-green-500"
                          }`}
                        />
                        Trang {bm.page}
                      </button>
                      <button
                        onClick={() => {
                          removeBookmark(bm.id);
                          toast.success("Da xoa danh dau");
                        }}
                        className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        aria-label="Xoa danh dau"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Settings */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="rounded-md p-1.5 transition-colors hover:bg-muted/50" aria-label="Cai dat">
                <Settings className="h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3">
              <div className="space-y-4">
                {/* Font size */}
                <div>
                  <p className="mb-2 text-xs font-medium">Co chu</p>
                  <div className="flex items-center gap-2">
                    <Type className="h-3 w-3" />
                    <Slider
                      value={[fontSize]}
                      onValueChange={([v]) => setFontSize(v)}
                      min={12}
                      max={24}
                      step={1}
                      className="flex-1"
                    />
                    <span className="w-6 text-right font-mono text-xs">{fontSize}</span>
                  </div>
                </div>

                {/* Theme */}
                <div>
                  <p className="mb-2 text-xs font-medium">Nen</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTheme("light")}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                        theme === "light" ? "border-teal ring-2 ring-teal/30" : "border-border"
                      } bg-white`}
                    >
                      <Sun className="h-4 w-4 text-foreground" />
                    </button>
                    <button
                      onClick={() => setTheme("cream")}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                        theme === "cream" ? "border-teal ring-2 ring-teal/30" : "border-border"
                      } bg-[#F5F0E8]`}
                    >
                      <span className="text-xs">Aa</span>
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                        theme === "dark" ? "border-teal ring-2 ring-teal/30" : "border-border"
                      } bg-[#1a1a18]`}
                    >
                      <Moon className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      {/* Main reading area */}
      <main className="relative flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-8">
        {/* Click zones for navigation */}
        <button
          onClick={() => flipPage("left")}
          disabled={currentPage === 1 || isFlipping}
          className="absolute left-0 top-0 z-10 h-full w-12 cursor-w-resize opacity-0 hover:opacity-10 sm:w-20"
          aria-label="Trang truoc"
        >
          <div className="flex h-full items-center justify-center bg-gradient-to-r from-foreground/20 to-transparent">
            <ChevronLeft className="h-8 w-8" />
          </div>
        </button>

        <button
          onClick={() => flipPage("right")}
          disabled={currentPage === pages.length || isFlipping}
          className="absolute right-0 top-0 z-10 h-full w-12 cursor-e-resize opacity-0 hover:opacity-10 sm:w-20"
          aria-label="Trang sau"
        >
          <div className="flex h-full items-center justify-center bg-gradient-to-l from-foreground/20 to-transparent">
            <ChevronRight className="h-8 w-8" />
          </div>
        </button>

        {/* Page content with flip animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{
              rotateY: flipDirection === "right" ? -90 : 90,
              opacity: 0,
            }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{
              rotateY: flipDirection === "right" ? 90 : -90,
              opacity: 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ perspective: 1000 }}
            className="w-full max-w-2xl"
          >
            <div
              ref={contentRef}
              className="mx-auto min-h-[60vh] rounded-lg border border-border/30 bg-inherit p-6 shadow-lg sm:p-10"
              style={{ fontSize: `${fontSize}px` }}
            >
              {/* Page number indicator */}
              <div className="mb-4 text-center text-xs text-muted-foreground">
                — {currentPage} —
              </div>

              {/* Page content */}
              <div className="prose prose-neutral max-w-none leading-relaxed dark:prose-invert">
                <WordHighlightedContent
                  content={currentPageData?.content || ""}
                  onWordClick={handleWordLookup}
                />
              </div>

              {/* Image placeholder if page has image */}
              {currentPageData?.hasImage && (
                <div className="mt-6 flex aspect-[3/2] items-center justify-center rounded-lg bg-muted/30">
                  <span className="text-xs text-muted-foreground">[ Hinh minh hoa ]</span>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating highlight toolbar */}
        <AnimatePresence>
          {selectedText && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-xl border border-border bg-card p-2 shadow-lg"
            >
              <Highlighter className="mr-1 h-4 w-4 text-muted-foreground" />
              {(["yellow", "green", "pink", "blue"] as const).map((color) => (
                <button
                  key={color}
                  onClick={() => handleHighlight(color)}
                  className={`h-6 w-6 rounded-full transition-transform hover:scale-110 ${
                    color === "yellow"
                      ? "bg-yellow-300"
                      : color === "green"
                        ? "bg-green-300"
                        : color === "pink"
                          ? "bg-pink-300"
                          : "bg-blue-300"
                  }`}
                  aria-label={`Highlight ${color}`}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Word lookup popup */}
        <AnimatePresence>
          {selectedWord && (
            <WordLookupPopup
              word={selectedWord}
              onClose={() => setSelectedWord(null)}
              onSave={(wordData) => {
                addVocab(wordData);
                toast.success(`Da them "${wordData.word}" vao bo tu`);
                setSelectedWord(null);
              }}
              existsInVocab={vocabWords.some(
                (v: { word: string }) => v.word.toLowerCase() === selectedWord.toLowerCase()
              )}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Bottom navigation */}
      <footer className="sticky bottom-0 z-40 flex items-center justify-between border-t border-border/20 bg-inherit px-4 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => flipPage("left")}
          disabled={currentPage === 1 || isFlipping}
          className="btn-press"
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Truoc
        </Button>

        {/* Progress bar */}
        <div className="flex flex-1 items-center gap-2 px-4">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-teal transition-all duration-300"
              style={{ width: `${(currentPage / pages.length) * 100}%` }}
            />
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {Math.round((currentPage / pages.length) * 100)}%
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => flipPage("right")}
          disabled={currentPage === pages.length || isFlipping}
          className="btn-press"
        >
          Sau <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </footer>
    </div>
  );
}

// Component to highlight clickable words
function WordHighlightedContent({
  content,
  onWordClick,
}: {
  content: string;
  onWordClick: (word: string) => void;
}) {
  const words = content.split(/(\s+)/);

  return (
    <p>
      {words.map((word, i) => {
        // Skip whitespace
        if (/^\s+$/.test(word)) {
          return <span key={i}>{word}</span>;
        }

        // Clean word for lookup
        const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();

        // Check if it's a vocabulary word
        const isVocabWord = mockVocabulary.some(
          (v) => v.word.toLowerCase() === cleanWord
        );

        if (isVocabWord) {
          return (
            <button
              key={i}
              onClick={() => onWordClick(cleanWord)}
              className="rounded px-0.5 font-medium text-teal underline decoration-teal/30 decoration-1 underline-offset-2 transition-colors hover:bg-teal/10"
            >
              {word}
            </button>
          );
        }

        // Regular word - still clickable for lookup
        return (
          <button
            key={i}
            onClick={() => onWordClick(cleanWord)}
            className="rounded px-0 transition-colors hover:bg-amber/10"
          >
            {word}
          </button>
        );
      })}
    </p>
  );
}

// Word lookup popup component
function WordLookupPopup({
  word,
  onClose,
  onSave,
  existsInVocab,
}: {
  word: string;
  onClose: () => void;
  onSave: (wordData: {
    word: string;
    ipa: string;
    vietnameseMeaning: string;
    englishDefinition: string;
    exampleSentence: string;
    collocations: string[];
    difficulty: 1 | 2 | 3 | 4 | 5;
  }) => void;
  existsInVocab: boolean;
}) {
  // Look up word in mock vocabulary
  const vocabEntry = mockVocabulary.find(
    (v) => v.word.toLowerCase() === word.toLowerCase()
  );

  // Mock data if not found
  const wordData = vocabEntry || {
    word: word,
    ipa: "/...../",
    vietnameseMeaning: "(Dang tra cuu...)",
    englishDefinition: "Looking up definition...",
    exampleSentence: "",
    collocations: [],
    difficulty: 3 as const,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="fixed bottom-32 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-border bg-card p-4 shadow-xl"
    >
      <button
        onClick={onClose}
        className="absolute right-2 top-2 rounded-md p-1 hover:bg-muted"
        aria-label="Dong"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-semibold">{wordData.word}</span>
          <button
            onClick={() => toast("Phat am (mock)")}
            className="rounded-full p-1 hover:bg-muted"
            aria-label="Phat am"
          >
            <Volume2 className="h-4 w-4" />
          </button>
          <Badge variant="outline" className="text-[10px]">
            Lv {wordData.difficulty}
          </Badge>
        </div>

        <p className="font-mono text-xs text-muted-foreground">{wordData.ipa}</p>
        <p className="text-sm font-medium">{wordData.vietnameseMeaning}</p>
        <p className="text-xs italic text-muted-foreground">{wordData.englishDefinition}</p>

        {wordData.exampleSentence && (
          <p className="text-xs text-muted-foreground">"{wordData.exampleSentence}"</p>
        )}

        {existsInVocab ? (
          <Button variant="outline" size="sm" disabled className="mt-2 w-full text-xs">
            Da co trong bo tu
          </Button>
        ) : vocabEntry ? (
          <Button
            size="sm"
            className="btn-press mt-2 w-full text-xs"
            onClick={() =>
              onSave({
                word: wordData.word,
                ipa: wordData.ipa,
                vietnameseMeaning: wordData.vietnameseMeaning,
                englishDefinition: wordData.englishDefinition,
                exampleSentence: wordData.exampleSentence,
                collocations: wordData.collocations,
                difficulty: wordData.difficulty,
              })
            }
          >
            <Plus className="mr-1 h-3 w-3" /> Them vao bo tu
          </Button>
        ) : (
          <p className="text-center text-xs text-muted-foreground">
            (Tu nay chua co trong tu dien mock)
          </p>
        )}
      </div>
    </motion.div>
  );
}
