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
              <div
                key={b.id}
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-3"
              >
                <span
                  className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: b.color }}
                />
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