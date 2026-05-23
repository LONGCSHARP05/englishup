import { BookOpen, FileText, Bookmark, Sparkles } from "lucide-react";

const items = [
  { label: "Đang đọc", value: "3 sách", Icon: BookOpen, color: "var(--teal)" },
  { label: "Trang đã đọc", value: "128 trang", Icon: FileText, color: "var(--indigo)" },
  { label: "Từ lưu từ sách", value: "56 từ", Icon: Bookmark, color: "var(--amber)" },
  { label: "Sách đã mở khóa", value: "4 sách", Icon: Sparkles, color: "var(--coral)" },
];

export function BookInsightCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {items.map(({ label, value, Icon, color }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-xl border border-border bg-card/70 p-4 backdrop-blur"
        >
          <div
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg"
            style={{ background: `color-mix(in oklab, ${color} 18%, white)`, color }}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className="truncate font-display text-lg font-semibold">{value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}