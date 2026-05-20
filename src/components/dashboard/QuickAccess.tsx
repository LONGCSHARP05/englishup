import { Link } from "@tanstack/react-router";
import { Plus, Zap, Trophy, BookMarked, ArrowRight, type LucideIcon } from "lucide-react";

type Item = { to: string; icon: LucideIcon; title: string; subtitle: string; tone: "teal" | "indigo" | "amber" | "coral" };

const items: Item[] = [
  { to: "/library", icon: Plus, title: "Thêm từ", subtitle: "Tạo tài liệu mới", tone: "teal" },
  { to: "/vocabulary", icon: Zap, title: "Luyện tập", subtitle: "Flashcard & Games", tone: "indigo" },
  { to: "/leaderboard", icon: Trophy, title: "Xếp hạng", subtitle: "Xem thành tích", tone: "amber" },
  { to: "/books", icon: BookMarked, title: "Thư viện sách", subtitle: "Đọc sách tiếng Anh", tone: "coral" },
];

const toneBg: Record<Item["tone"], string> = {
  teal: "bg-teal/15 text-teal",
  indigo: "bg-indigo/15 text-indigo",
  amber: "bg-amber/20 text-amber",
  coral: "bg-coral/15 text-coral",
};

export function QuickAccess() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <Link key={it.to} to={it.to} className="card-lift group flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneBg[it.tone]}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="font-display text-base font-semibold">{it.title}</div>
              <div className="truncate text-xs text-muted-foreground">{it.subtitle}</div>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </Link>
        );
      })}
    </div>
  );
}
