import type { VocabPack } from "@/mock";

const gradientMap: Record<string, string> = {
  "from-teal/80 to-indigo/80": "linear-gradient(135deg, var(--teal), var(--indigo))",
  "from-indigo/80 to-coral/70": "linear-gradient(135deg, var(--indigo), var(--coral))",
  "from-amber/80 to-coral/80": "linear-gradient(135deg, var(--amber), var(--coral))",
  "from-teal/80 to-amber/70": "linear-gradient(135deg, var(--teal), var(--amber))",
  "from-indigo/80 to-teal/70": "linear-gradient(135deg, var(--indigo), var(--teal))",
  "from-coral/80 to-amber/70": "linear-gradient(135deg, var(--coral), var(--amber))",
};

export function VocabPackCard({ pack }: { pack: VocabPack }) {
  const bg = gradientMap[pack.coverGradient] ?? "linear-gradient(135deg, var(--teal), var(--indigo))";
  return (
    <article className="card-lift overflow-hidden rounded-xl border border-border bg-card shadow-card">
      <div className="relative h-28 w-full" style={{ background: bg }}>
        <span className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${pack.isPremium ? "bg-amber text-amber-foreground" : "bg-teal text-teal-foreground"}`}>
          {pack.isPremium ? "PREMIUM" : "MIỄN PHÍ"}
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3">
          <div className="font-display text-sm font-semibold leading-snug text-white line-clamp-2">{pack.title}</div>
        </div>
      </div>
      <div className="space-y-2 p-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="rounded-full bg-secondary px-2 py-0.5 font-medium text-foreground">{pack.level}</span>
          <span>{pack.wordCount} từ</span>
        </div>
        <div className="flex items-center gap-1" aria-label={`Độ khó ${pack.difficulty} trên 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`h-1.5 flex-1 rounded-full ${i < pack.difficulty ? (i < 2 ? "bg-teal" : i < 4 ? "bg-amber" : "bg-coral") : "bg-secondary"}`} />
          ))}
        </div>
      </div>
    </article>
  );
}
