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