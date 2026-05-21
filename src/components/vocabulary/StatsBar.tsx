import { Flame, BookOpen, Target } from "lucide-react";

type Props = {
  dueToday: number;
  learnedTotal: number;
  weeklyAccuracy: number;
};

export function StatsBar({ dueToday, learnedTotal, weeklyAccuracy }: Props) {
  const items = [
    {
      label: "Cần ôn hôm nay",
      value: `${dueToday} thẻ`,
      icon: Flame,
      color: "text-coral",
      bg: "bg-coral/10",
    },
    {
      label: "Từ đã học",
      value: `${learnedTotal}`,
      icon: BookOpen,
      color: "text-teal",
      bg: "bg-teal/10",
    },
    {
      label: "Độ chính xác tuần này",
      value: `${weeklyAccuracy}%`,
      icon: Target,
      color: "text-indigo",
      bg: "bg-indigo/10",
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {items.map(({ label, value, icon: Icon, color, bg }) => (
        <div
          key={label}
          className="card-lift flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-card"
        >
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg}`}>
            <Icon className={`h-5 w-5 ${color}`} />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className={`font-display text-xl font-semibold ${color}`}>{value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}