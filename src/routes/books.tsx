import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { BookStoreHero } from "@/components/books/BookStoreHero";
import { BookInsightCards } from "@/components/books/BookInsightCards";
import { BookFilters, type SortKey } from "@/components/books/BookFilters";
import { BookCard } from "@/components/books/BookCard";
import { UnlockBookDialog } from "@/components/books/UnlockBookDialog";
import { mockBooks, type BookData } from "@/mock/books";
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

  const filtered = useMemo(() => {
    let list = mockBooks.slice();
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
  }, [query, filter, sort]);

  const continueBookId = useMemo(() => {
    const inProgress = Object.entries(currentPage).find(([, p]) => p > 1);
    return inProgress?.[0];
  }, [currentPage]);

  const goRead = (id: string) => navigate({ to: "/books/$bookId", params: { bookId: id } });

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <BookStoreHero
        onExplore={() => {
          const el = document.getElementById("book-grid");
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        onContinue={() => continueBookId && goRead(continueBookId)}
        hasContinue={!!continueBookId}
      />

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
    </div>
  );
}
