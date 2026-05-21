const STATUS = [
  { label: "Mới", cls: "bg-indigo/15 text-indigo" },
  { label: "Đang học", cls: "bg-amber/20 text-amber" },
  { label: "Cần ôn", cls: "bg-coral/15 text-coral" },
  { label: "Thành thạo", cls: "bg-teal/15 text-teal" },
];

export function StatusLegend() {
  return (
    <div className="flex flex-wrap gap-2">
      {STATUS.map((s) => (
        <span
          key={s.label}
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${s.cls}`}
        >
          {s.label}
        </span>
      ))}
    </div>
  );
}

export const statusBadge: Record<string, { label: string; cls: string }> = {
  new: { label: "Mới", cls: "bg-indigo/15 text-indigo" },
  learning: { label: "Đang học", cls: "bg-amber/20 text-amber" },
  review: { label: "Cần ôn", cls: "bg-coral/15 text-coral" },
  mastered: { label: "Thành thạo", cls: "bg-teal/15 text-teal" },
};