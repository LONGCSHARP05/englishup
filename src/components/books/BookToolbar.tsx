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