import { Volume2, Bookmark, Layers } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import type { BookVocabWord } from "@/mock/books";

type Props = {
  word: BookVocabWord;
  children: React.ReactNode;
  onSave: () => void;
  onCreateFlashcard: () => void;
};

export function VocabPopover({ word, children, onSave, onCreateFlashcard }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-72" align="center">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="font-display text-base font-semibold">{word.word}</div>
              <div className="font-mono text-xs text-muted-foreground">{word.ipa}</div>
            </div>
            <button
              className="rounded-md p-1 text-muted-foreground hover:bg-accent"
              aria-label="Phát âm"
              type="button"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </div>
          <div className="text-sm font-medium text-foreground">{word.vietnameseMeaning}</div>
          <div className="text-xs text-muted-foreground">{word.englishDefinition}</div>
          <div className="rounded-md bg-secondary px-2 py-1.5 text-xs italic text-foreground/80">
            “{word.exampleSentence}”
          </div>
          <div className="flex gap-2 pt-1">
            <Button size="sm" className="flex-1 btn-press" onClick={onSave}>
              <Bookmark className="h-3.5 w-3.5" />
              Lưu vào từ vựng
            </Button>
            <Button size="sm" variant="outline" className="btn-press" onClick={onCreateFlashcard}>
              <Layers className="h-3.5 w-3.5" />
              Flashcard
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

*** Add File: src/components/books/HighlightToolbar.tsx
import { useState } from "react";
import { Highlighter, MessageSquare, Languages, Bookmark } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
  sentence: string;
  onHighlight: () => void;
  onAddNote: () => void;
};

export function HighlightToolbar({ children, sentence, onHighlight, onAddNote }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span
          onDoubleClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          className="cursor-text"
        >
          {children}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-1" align="center">
        <div className="flex items-center gap-0.5">
          <ToolBtn
            icon={<Highlighter className="h-4 w-4" />}
            label="Highlight"
            onClick={() => {
              onHighlight();
              setOpen(false);
            }}
          />
          <ToolBtn
            icon={<MessageSquare className="h-4 w-4" />}
            label="Ghi chú"
            onClick={() => {
              onAddNote();
              setOpen(false);
            }}
          />
          <ToolBtn
            icon={<Languages className="h-4 w-4" />}
            label="Dịch"
            onClick={() => {
              toast.message(`Bản dịch (mock): ${sentence.slice(0, 60)}...`);
              setOpen(false);
            }}
          />
          <ToolBtn
            icon={<Bookmark className="h-4 w-4" />}
            label="Lưu từ"
            onClick={() => {
              toast.success("Đã lưu từ vào từ vựng");
              setOpen(false);
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ToolBtn({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-foreground/80 hover:bg-accent"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

*** Add File: src/components/books/BookPage.tsx
import { useMemo } from "react";
import type { BookPageData, BookVocabWord } from "@/mock/books";
import { VocabPopover } from "./VocabPopover";
import { HighlightToolbar } from "./HighlightToolbar";
import { useBooksStore } from "@/store/useBooksStore";
import { toast } from "sonner";

type Props = {
  bookId: string;
  page: BookPageData;
  totalPages: number;
  side?: "left" | "right" | "single";
  fontSize: "sm" | "md" | "lg";
  theme: "light" | "sepia" | "dark";
};

const sizeMap = {
  sm: "text-[14px] leading-7",
  md: "text-[15px] leading-8",
  lg: "text-[17px] leading-9",
} as const;

export function BookPage({ bookId, page, totalPages, side = "single", fontSize, theme }: Props) {
  const saveWord = useBooksStore((s) => s.saveWord);
  const addHighlight = useBooksStore((s) => s.addHighlight);

  const themeClass =
    theme === "light" ? "theme-light" : theme === "dark" ? "theme-dark" : "";
  const curlClass = side === "left" ? "page-curl-left" : "page-curl";

  const tokenMap = useMemo(() => {
    const map = new Map<string, BookVocabWord>();
    page.vocabularyWords.forEach((v) => map.set(v.word.toLowerCase(), v));
    return map;
  }, [page.vocabularyWords]);

  return (
    <div className={`relative h-full w-full overflow-hidden page-surface ${themeClass} ${curlClass}`}>
      <div className="flex h-full w-full flex-col px-6 py-7 sm:px-10 sm:py-10">
        <div className={`mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider ${theme === "dark" ? "text-white/40" : "text-foreground/40"}`}>
          <span>EnglishUp Library</span>
          <span>—</span>
        </div>

        <div className={`flex-1 overflow-y-auto ${sizeMap[fontSize]} ${theme === "dark" ? "text-[#efe9d8]" : "text-foreground/90"} font-display`}>
          {page.paragraphs.map((para, idx) => (
            <ParagraphWithVocab
              key={idx}
              text={para}
              tokenMap={tokenMap}
              onSaveWord={(word) => {
                saveWord(bookId, word);
                toast.success(`Đã lưu “${word}” vào từ vựng`);
              }}
              onCreateFlashcard={(word) => {
                toast.success(`Đã tạo flashcard cho “${word}”`);
              }}
              onHighlightSentence={(sentence) => {
                addHighlight({ bookId, pageNumber: page.pageNumber, selectedText: sentence, color: "var(--amber)" });
                toast.success("Đã highlight đoạn này");
              }}
              onAddNote={(sentence) => {
                const note = window.prompt("Viết ghi chú cho đoạn này...");
                if (!note) return;
                addHighlight({ bookId, pageNumber: page.pageNumber, selectedText: sentence, color: "var(--indigo)", note });
                toast.success("Đã lưu ghi chú");
              }}
            />
          ))}
        </div>

        <div className={`mt-4 flex items-center justify-between font-mono text-[11px] ${theme === "dark" ? "text-white/50" : "text-foreground/50"}`}>
          <span>Trang {page.pageNumber}</span>
          <span>{page.pageNumber} / {totalPages}</span>
        </div>
      </div>
    </div>
  );
}

function ParagraphWithVocab({
  text,
  tokenMap,
  onSaveWord,
  onCreateFlashcard,
  onHighlightSentence,
  onAddNote,
}: {
  text: string;
  tokenMap: Map<string, BookVocabWord>;
  onSaveWord: (w: string) => void;
  onCreateFlashcard: (w: string) => void;
  onHighlightSentence: (s: string) => void;
  onAddNote: (s: string) => void;
}) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  return (
    <p className="mb-4">
      {sentences.map((sentence, si) => (
        <HighlightToolbar
          key={si}
          sentence={sentence.trim()}
          onHighlight={() => onHighlightSentence(sentence.trim())}
          onAddNote={() => onAddNote(sentence.trim())}
        >
          <Sentence text={sentence} tokenMap={tokenMap} onSaveWord={onSaveWord} onCreateFlashcard={onCreateFlashcard} />
        </HighlightToolbar>
      ))}
    </p>
  );
}

function Sentence({
  text,
  tokenMap,
  onSaveWord,
  onCreateFlashcard,
}: {
  text: string;
  tokenMap: Map<string, BookVocabWord>;
  onSaveWord: (w: string) => void;
  onCreateFlashcard: (w: string) => void;
}) {
  const parts = text.split(/(\s+|[.,!?;:"”“])/);
  return (
    <>
      {parts.map((part, i) => {
        const clean = part.toLowerCase().replace(/[^a-z']/g, "");
        const vocab = tokenMap.get(clean);
        if (vocab) {
          return (
            <VocabPopover
              key={i}
              word={vocab}
              onSave={() => onSaveWord(vocab.word)}
              onCreateFlashcard={() => onCreateFlashcard(vocab.word)}
            >
              <span className="vocab-token">{part}</span>
            </VocabPopover>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

*** Add File: src/components/books/ReadingSettings.tsx
import { Settings2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useBooksStore, type ReadingSettingsState } from "@/store/useBooksStore";
import { cn } from "@/lib/utils";

type Group = {
  key: keyof ReadingSettingsState;
  label: string;
  options: { value: string; label: string }[];
};

const groups: Group[] = [
  {
    key: "fontSize",
    label: "Cỡ chữ",
    options: [
      { value: "sm", label: "Nhỏ" },
      { value: "md", label: "Vừa" },
      { value: "lg", label: "Lớn" },
    ],
  },
  {
    key: "theme",
    label: "Nền trang",
    options: [
      { value: "light", label: "Sáng" },
      { value: "sepia", label: "Giấy vàng" },
      { value: "dark", label: "Tối" },
    ],
  },
  {
    key: "layout",
    label: "Bố cục",
    options: [
      { value: "single", label: "Một trang" },
      { value: "spread", label: "Hai trang" },
    ],
  },
];

export function ReadingSettings() {
  const settings = useBooksStore((s) => s.settings);
  const setSettings = useBooksStore((s) => s.setSettings);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Cài đặt đọc">
          <Settings2 className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 space-y-4">
        {groups.map((g) => (
          <div key={g.key}>
            <div className="mb-2 text-xs font-medium text-muted-foreground">{g.label}</div>
            <div className="flex gap-1.5">
              {g.options.map((o) => {
                const active = (settings[g.key] as string) === o.value;
                return (
                  <button
                    key={o.value}
                    onClick={() => setSettings({ [g.key]: o.value } as Partial<ReadingSettingsState>)}
                    className={cn(
                      "flex-1 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:bg-accent",
                    )}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}

*** Add File: src/components/books/BookmarkSheet.tsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Bookmark as BookmarkIcon, Trash2 } from "lucide-react";
import { useBooksStore } from "@/store/useBooksStore";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  bookId: string;
  onJump: (page: number) => void;
};

export function BookmarkSheet({ open, onOpenChange, bookId, onJump }: Props) {
  const bookmarks = useBooksStore((s) => s.bookmarks.filter((b) => b.bookId === bookId));
  const remove = useBooksStore((s) => s.removeBookmark);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[min(360px,100vw)] sm:max-w-[360px]">
        <SheetHeader>
          <SheetTitle className="font-display flex items-center gap-2">
            <BookmarkIcon className="h-4 w-4" /> Trang đã đánh dấu
          </SheetTitle>
          <SheetDescription>Bấm vào một trang để quay lại điểm đã đánh dấu.</SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-2 overflow-y-auto pb-4">
          {bookmarks.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
              Chưa có bookmark nào. Bấm icon bookmark trên thanh công cụ để lưu trang hiện tại.
            </div>
          ) : (
            bookmarks.map((b) => (
              <div key={b.id} className="group flex items-start gap-3 rounded-lg border border-border bg-card p-3">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: b.color }} />
                <button
                  onClick={() => {
                    onJump(b.pageNumber);
                    onOpenChange(false);
                  }}
                  className="min-w-0 flex-1 text-left"
                >
                  <div className="text-xs font-semibold text-foreground">Trang {b.pageNumber}</div>
                  <div className="line-clamp-2 text-xs text-muted-foreground">{b.excerpt}</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">
                    {new Date(b.createdAt).toLocaleString("vi-VN")}
                  </div>
                </button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    remove(b.id);
                    toast.success("Đã xóa bookmark");
                  }}
                  aria-label="Xóa bookmark"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

*** Add File: src/components/books/NotesSheet.tsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Highlighter, Trash2 } from "lucide-react";
import { useBooksStore } from "@/store/useBooksStore";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  bookId: string;
  onJump: (page: number) => void;
};

export function NotesSheet({ open, onOpenChange, bookId, onJump }: Props) {
  const highlights = useBooksStore((s) => s.highlights.filter((h) => h.bookId === bookId));
  const remove = useBooksStore((s) => s.removeHighlight);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[min(380px,100vw)] sm:max-w-[380px]">
        <SheetHeader>
          <SheetTitle className="font-display flex items-center gap-2">
            <Highlighter className="h-4 w-4" /> Highlight & Ghi chú
          </SheetTitle>
          <SheetDescription>Tổng hợp các đoạn bạn đã đánh dấu khi đọc.</SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-2 overflow-y-auto pb-4">
          {highlights.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
              Chưa có highlight nào. Bấm đúp vào câu trong sách để highlight hoặc ghi chú.
            </div>
          ) : (
            highlights.map((h) => (
              <div key={h.id} className="rounded-lg border border-border bg-card p-3">
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      onJump(h.pageNumber);
                      onOpenChange(false);
                    }}
                    className="text-xs font-semibold text-foreground"
                  >
                    Trang {h.pageNumber}
                  </button>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Xóa"
                    onClick={() => {
                      remove(h.id);
                      toast.success("Đã xóa highlight");
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div
                  className="mt-1 rounded-md px-2 py-1.5 text-xs italic text-foreground/90"
                  style={{ background: `color-mix(in oklab, ${h.color} 22%, white)` }}
                >
                  “{h.selectedText}”
                </div>
                {h.note && (
                  <div className="mt-2 rounded-md bg-secondary px-2 py-1.5 text-xs text-foreground/80">
                    {h.note}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

*** Add File: src/components/books/BookToolbar.tsx
import { ArrowLeft, Bookmark, BookmarkCheck, Maximize2, Highlighter } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ReadingSettings } from "./ReadingSettings";

type Props = {
  title: string;
  page: number;
  totalPages: number;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onOpenBookmarks: () => void;
  onOpenNotes: () => void;
  onFullscreen: () => void;
};

export function BookToolbar({
  title,
  page,
  totalPages,
  isBookmarked,
  onToggleBookmark,
  onOpenBookmarks,
  onOpenNotes,
  onFullscreen,
}: Props) {
  const percent = Math.round((page / totalPages) * 100);
  return (
    <div className="sticky top-0 z-30 w-full border-b border-border bg-card/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-3 py-2 sm:px-6 sm:py-3">
        <Button asChild variant="ghost" size="sm" className="btn-press">
          <Link to="/books">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Quay lại thư viện</span>
          </Link>
        </Button>

        <div className="mx-2 hidden h-5 w-px bg-border sm:block" />

        <div className="min-w-0 flex-1">
          <div className="truncate font-display text-sm font-semibold sm:text-base">{title}</div>
          <div className="text-[11px] text-muted-foreground">
            Trang {page} / {totalPages} · Đã đọc {percent}%
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleBookmark}
            aria-label={isBookmarked ? "Bỏ đánh dấu" : "Đánh dấu trang"}
            className={isBookmarked ? "text-amber" : ""}
          >
            {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onOpenBookmarks} aria-label="Danh sách bookmark">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onOpenNotes} aria-label="Highlight và ghi chú">
            <Highlighter className="h-4 w-4" />
          </Button>
          <ReadingSettings />
          <Button variant="ghost" size="icon" onClick={onFullscreen} aria-label="Toàn màn hình">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="h-1 w-full bg-secondary">
        <div className="h-full bg-primary transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

*** Add File: src/components/books/CompletionCard.tsx
import { Trophy, RefreshCw, Library, Layers } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

type Props = {
  totalPages: number;
  savedWords: number;
  highlights: number;
  onReread: () => void;
};

export function CompletionCard({ totalPages, savedWords, highlights, onReread }: Props) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-border bg-gradient-to-br from-[#fbf5e7] to-[#f6ecd5] p-6 text-center shadow-card">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-amber text-amber-foreground">
        <Trophy className="h-6 w-6" />
      </div>
      <h2 className="mt-4 font-display text-2xl font-semibold">Bạn đã hoàn thành sách 🎉</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Tuyệt vời! Đừng quên ôn lại từ vựng bạn vừa thu thập được.
      </p>

      <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
        <Stat label="Trang đã đọc" value={`${totalPages}`} />
        <Stat label="Từ đã lưu" value={`${savedWords}`} />
        <Stat label="Highlight" value={`${highlights}`} />
      </div>
      <div className="mt-2 text-xs text-muted-foreground">+50 XP mock thưởng</div>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <Button asChild className="btn-press">
          <Link to="/vocabulary">
            <Layers className="h-4 w-4" />
            Ôn từ đã lưu
          </Link>
        </Button>
        <Button variant="outline" onClick={onReread} className="btn-press">
          <RefreshCw className="h-4 w-4" />
          Đọc lại
        </Button>
        <Button asChild variant="ghost" className="btn-press">
          <Link to="/books">
            <Library className="h-4 w-4" />
            Chọn sách khác
          </Link>
        </Button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="font-display text-lg font-semibold">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}