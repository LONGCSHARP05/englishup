import { Gem, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BookData } from "@/mock/books";

type Props = {
  book: BookData;
  isUnlocked: boolean;
  currentPage?: number;
  onRead: () => void;
  onUnlock: () => void;
};

export function BookCard({ book, isUnlocked, currentPage, onRead, onUnlock }: Props) {
  const progress = currentPage ? Math.min(100, Math.round((currentPage / book.totalPages) * 100)) : 0;
  const hasProgress = !!currentPage && currentPage > 1;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card card-lift">
      {/* Cover */}
      <div className="relative px-4 pt-5">
        <div
          className="book-cover mx-auto flex aspect-[3/4] w-full max-w-[200px] flex-col justify-between p-4 text-white"
          style={{ background: book.coverGradient }}
        >
          <div className="flex items-start justify-between">
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold backdrop-blur">
              {book.level}
            </span>
            {book.isPremium && (
              <span className="rounded-full bg-amber px-2 py-0.5 text-[10px] font-semibold text-amber-foreground">
                PREMIUM
              </span>
            )}
          </div>
          <div>
            <div className="font-display text-base font-semibold leading-tight line-clamp-3">
              {book.title}
            </div>
            <div className="mt-1 text-[11px] text-white/80 line-clamp-1">{book.author}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="line-clamp-2 text-xs text-muted-foreground">{book.shortDescription}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{book.totalPages} trang</span>
          <span>{book.readCount.toLocaleString("vi-VN")} lượt đọc</span>
        </div>

        {hasProgress && (
          <div className="space-y-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-[11px] text-muted-foreground">Đã đọc {progress}%</div>
          </div>
        )}

        {isUnlocked ? (
          <Button onClick={onRead} className="btn-press w-full">
            {hasProgress ? "Đọc tiếp" : "Đọc ngay"}
          </Button>
        ) : (
          <Button
            onClick={onUnlock}
            variant="secondary"
            className="btn-press w-full bg-amber/15 text-foreground hover:bg-amber/25"
          >
            <Lock className="h-4 w-4" />
            Mở khóa
            <span className="ml-auto inline-flex items-center gap-1 text-sm font-semibold">
              <Gem className="h-3.5 w-3.5 text-amber" />
              {book.rubyPrice}
            </span>
          </Button>
        )}
      </div>
    </article>
  );
}