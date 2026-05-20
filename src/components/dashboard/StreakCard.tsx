import { Flame } from "lucide-react";

const daysLabels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

export function StreakCard({ current = 7, completedDays = 5 }: { current?: number; completedDays?: number }) {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-amber to-[oklch(0.72_0.16_55)] p-6 text-amber-foreground shadow-card">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/90">
        <Flame className="h-4 w-4" /> Chuỗi ngày học
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-display text-6xl font-bold leading-none text-white drop-shadow-sm">
          {current}
        </span>
        <span className="text-sm font-medium text-white/90">ngày liên tiếp</span>
      </div>
      <div className="mt-5 flex items-center justify-between">
        {daysLabels.map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div className={`h-3 w-3 rounded-full border-2 border-white ${i < completedDays ? "bg-white" : "bg-transparent"}`} />
            <span className="text-[10px] font-medium text-white/85">{label}</span>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-xl" />
    </div>
  );
}
