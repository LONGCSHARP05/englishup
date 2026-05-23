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