import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookStoreHero } from "@/components/books/BookStoreHero";
import { BookInsightCards } from "@/components/books/BookInsightCards";
import { BookFilters, type SortKey } from "@/components/books/BookFilters";
import { BookCard } from "@/components/books/BookCard";
import { UnlockBookDialog } from "@/components/books/UnlockBookDialog";
import { UploadBookDialog } from "@/components/books/UploadBookDialog";
import { mockBooks, type BookData, type BookLevel, type BookCategory } from "@/mock/books";
import { useBooksStore } from "@/store/useBooksStore";
import { useAppStore } from "@/store/useAppStore";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Sách — EnglishUp" },
      { name: "description", content: "Thư viện sách tiếng Anh: đọc, học từ vựng và mở khóa bằng Ruby." },
    ],
  }),
  component: BooksPage,
});

function BooksPage() {
  const navigate = useNavigate();
  const { unlockedBookIds, currentPage, unlock } = useBooksStore();
  const { user, setRubyBalance } = useAppStore();

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Tất cả");
  const [sort, setSort] = useState<SortKey>("newest");
  const [unlockTarget, setUnlockTarget] = useState<BookData | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [userBooks, setUserBooks] = useState<BookData[]>([]);

  const filtered = useMemo(() => {
    let list = [...mockBooks, ...userBooks];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q),
      );
    }
    if (filter !== "Tất cả") {
      if (filter === "Miễn phí") list = list.filter((b) => !b.isPremium);
      else if (filter === "Premium") list = list.filter((b) => b.isPremium);
      else if (["A1", "A2", "B1", "B2", "C1"].includes(filter))
        list = list.filter((b) => b.level === filter);
      else list = list.filter((b) => b.category === filter);
    }
    const levelOrder = ["A1", "A2", "B1", "B2", "C1"];
    if (sort === "newest")
      list.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    else if (sort === "popular") list.sort((a, b) => b.readCount - a.readCount);
    else if (sort === "ruby-asc") list.sort((a, b) => a.rubyPrice - b.rubyPrice);
    else if (sort === "level-asc")
      list.sort((a, b) => levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level));
    return list;
  }, [query, filter, sort, userBooks]);

  const continueBookId = useMemo(() => {
    const inProgress = Object.entries(currentPage).find(([, p]) => p > 1);
    return inProgress?.[0];
  }, [currentPage]);

  const goRead = (id: string) => navigate({ to: "/books/$bookId", params: { bookId: id } });

  const handleUploadBook = (bookData: {
    title: string;
    author: string;
    level: BookLevel;
    category: BookCategory;
    isPremium: boolean;
    rubyPrice: number;
  }) => {
    const gradients = [
      "linear-gradient(135deg, var(--amber), var(--coral))",
      "linear-gradient(135deg, var(--indigo), var(--teal))",
      "linear-gradient(135deg, var(--teal), var(--indigo))",
      "linear-gradient(135deg, var(--coral), var(--amber))",
    ];
    const newBook: BookData = {
      id: `bk-user-${Date.now()}`,
      title: bookData.title,
      author: bookData.author,
      coverGradient: gradients[Math.floor(Math.random() * gradients.length)],
      level: bookData.level,
      totalPages: 8,
      category: bookData.category,
      isPremium: bookData.isPremium,
      rubyPrice: bookData.rubyPrice,
      readCount: 0,
      createdAt: new Date().toISOString(),
      shortDescription: "Sách do người dùng thêm vào thư viện.",
      pages: [],
    };
    setUserBooks((prev) => [newBook, ...prev]);
    toast.success("Sách đã được thêm vào Thư viện sách");
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      {/* Header with Upload Button */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <BookStoreHero
          onExplore={() => {
            const el = document.getElementById("book-grid");
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          onContinue={() => continueBookId && goRead(continueBookId)}
          hasContinue={!!continueBookId}
        />
        <Button
          onClick={() => setUploadOpen(true)}
          variant="outline"
          size="lg"
          className="btn-press w-full md:w-auto"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Thêm sách mới
        </Button>
      </div>

      <BookInsightCards />

      <div id="book-grid" className="space-y-4">
        <BookFilters
          query={query}
          setQuery={setQuery}
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
        />

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <div className="font-display text-lg font-semibold">Không tìm thấy sách phù hợp</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Thử bỏ bớt bộ lọc hoặc tìm kiếm với từ khóa khác.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((book) => {
              const isUnlocked = !book.isPremium || unlockedBookIds.includes(book.id);
              return (
                <BookCard
                  key={book.id}
                  book={book}
                  isUnlocked={isUnlocked}
                  currentPage={currentPage[book.id]}
                  onRead={() => goRead(book.id)}
                  onUnlock={() => setUnlockTarget(book)}
                />
              );
            })}
          </div>
        )}
      </div>

      <UnlockBookDialog
        open={!!unlockTarget}
        onOpenChange={(v) => !v && setUnlockTarget(null)}
        book={unlockTarget}
        rubyBalance={user.rubyBalance}
        onConfirm={() => {
          if (!unlockTarget) return;
          if (user.rubyBalance < unlockTarget.rubyPrice) {
            toast.error("Bạn không đủ Ruby. Vui lòng nạp thêm Ruby trong cửa hàng.");
            return;
          }
          setRubyBalance(user.rubyBalance - unlockTarget.rubyPrice);
          unlock(unlockTarget.id);
          toast.success("Đã mở khóa sách thành công");
          setUnlockTarget(null);
        }}
      />

      <UploadBookDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onUpload={handleUploadBook}
      />
    </div>
  );
}
