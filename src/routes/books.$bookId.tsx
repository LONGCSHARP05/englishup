import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { getBookById } from "@/mock/books";
import { useBooksStore } from "@/store/useBooksStore";
import { BookToolbar } from "@/components/books/BookToolbar";
import { BookReader } from "@/components/books/BookReader";
import { BookmarkSheet } from "@/components/books/BookmarkSheet";
import { NotesSheet } from "@/components/books/NotesSheet";
import { CompletionCard } from "@/components/books/CompletionCard";

export const Route = createFileRoute("/books/$bookId")({
  head: () => ({
    meta: [
      { title: "Đang đọc — EnglishUp" },
      { name: "description", content: "Trải nghiệm đọc sách tiếng Anh tương tác." },
    ],
  }),
  component: BookReaderPage,
});

function BookReaderPage() {
  const { bookId } = useParams({ from: "/books/$bookId" });
  const book = getBookById(bookId);
  const {
    currentPage,
    setCurrentPage,
    bookmarks,
    addBookmark,
    removeBookmark,
    highlights,
    savedWords,
  } = useBooksStore();

  const [bmOpen, setBmOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [completed, setCompleted] = useState(false);

  const page = book ? currentPage[book.id] ?? 1 : 1;

  useEffect(() => {
    if (book && page >= book.totalPages) setCompleted(true);
  }, [book, page]);

  if (!book) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <div className="font-display text-2xl font-semibold">Không tìm thấy sách</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Cuốn sách này có thể đã bị xóa hoặc chưa xuất bản.
        </p>
        <Button asChild className="mt-6 btn-press">
          <Link to="/books">
            <BookOpen className="h-4 w-4" />
            Về thư viện
          </Link>
        </Button>
      </div>
    );
  }

  const currentBookmark = bookmarks.find(
    (b) => b.bookId === book.id && b.pageNumber === page,
  );

  const toggleBookmark = () => {
    if (currentBookmark) {
      removeBookmark(currentBookmark.id);
      toast.success("Đã bỏ đánh dấu trang");
    } else {
      const excerpt = book.pages[page - 1]?.paragraphs[0]?.slice(0, 90) ?? "";
      addBookmark({
        bookId: book.id,
        pageNumber: page,
        excerpt,
        color: "var(--amber)",
      });
      toast.success("Đã đánh dấu trang");
    }
  };

  const bookSavedWords = savedWords.filter((w) => w.bookId === book.id).length;
  const bookHighlights = highlights.filter((h) => h.bookId === book.id).length;

  return (
    <div className="min-h-screen bg-[#efe7d3]/40">
      <BookToolbar
        title={book.title}
        page={page}
        totalPages={book.totalPages}
        isBookmarked={!!currentBookmark}
        onToggleBookmark={toggleBookmark}
        onOpenBookmarks={() => setBmOpen(true)}
        onOpenNotes={() => setNotesOpen(true)}
        onFullscreen={() => {
          if (document.fullscreenElement) document.exitFullscreen();
          else document.documentElement.requestFullscreen?.();
        }}
      />

      <div className="px-2 py-6 sm:px-4 sm:py-10">
        {completed ? (
          <CompletionCard
            totalPages={book.totalPages}
            savedWords={bookSavedWords}
            highlights={bookHighlights}
            onReread={() => {
              setCurrentPage(book.id, 1);
              setCompleted(false);
            }}
          />
        ) : (
          <BookReader
            book={book}
            page={page}
            onChangePage={(p) => {
              setCurrentPage(book.id, p);
              if (p >= book.totalPages) setCompleted(true);
            }}
          />
        )}

        <div className="mx-auto mt-6 max-w-xl text-center text-xs text-muted-foreground">
          Đã lưu tiến trình
        </div>
      </div>

      <BookmarkSheet
        open={bmOpen}
        onOpenChange={setBmOpen}
        bookId={book.id}
        onJump={(p) => setCurrentPage(book.id, p)}
      />
      <NotesSheet
        open={notesOpen}
        onOpenChange={setNotesOpen}
        bookId={book.id}
        onJump={(p) => setCurrentPage(book.id, p)}
      />
    </div>
  );
}