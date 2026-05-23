import { Gem } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { BookData } from "@/mock/books";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  book: BookData | null;
  rubyBalance: number;
  onConfirm: () => void;
};

export function UnlockBookDialog({ open, onOpenChange, book, rubyBalance, onConfirm }: Props) {
  if (!book) return null;
  const enough = rubyBalance >= book.rubyPrice;
  const remaining = rubyBalance - book.rubyPrice;
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[calc(100vw-24px)] max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display">Mở khóa sách?</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn sẽ dùng {book.rubyPrice} Ruby để mở khóa “{book.title}” vĩnh viễn.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-2 rounded-lg border border-border bg-secondary/60 p-3 text-sm">
          <Row label="Ruby hiện có" value={`${rubyBalance} Ruby`} />
          <Row label="Giá sách" value={`${book.rubyPrice} Ruby`} />
          <div className="my-2 border-t border-border" />
          <Row
            label="Còn lại sau khi mua"
            value={`${enough ? remaining : 0} Ruby`}
            highlight={!enough}
          />
        </div>

        {!enough && (
          <p className="text-xs text-destructive">
            Bạn không đủ Ruby. Vui lòng nạp thêm Ruby trong cửa hàng.
          </p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={!enough}>
            <Gem className="h-4 w-4" />
            Mở khóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={highlight ? "font-semibold text-destructive" : "font-semibold"}>{value}</span>
    </div>
  );
}