import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { mockVocabulary } from "@/mock";

const statusBadge: Record<string, { label: string; cls: string }> = {
  new: { label: "Mới", cls: "bg-indigo/15 text-indigo" },
  learning: { label: "Đang học", cls: "bg-amber/20 text-amber" },
  review: { label: "Cần ôn", cls: "bg-coral/15 text-coral" },
  mastered: { label: "Thành thạo", cls: "bg-teal/15 text-teal" },
};

export function ReviewQueue() {
  const due = mockVocabulary.filter((v) => v.status === "review" || v.status === "learning");
  const preview = due.slice(0, 3);
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">
          Cần ôn hôm nay <span className="text-muted-foreground">({due.length} thẻ)</span>
        </h2>
        <Link to="/vocabulary" className="btn-press inline-flex items-center gap-1 rounded-full border border-teal/30 px-3 py-1.5 text-sm font-medium text-teal hover:bg-teal/10">
          Ôn tất cả <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {preview.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
          Không còn thẻ nào cần ôn hôm nay.
        </div>
      ) : (
        <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {preview.map((v) => {
            const badge = statusBadge[v.status];
            return (
              <div key={v.id} className="card-lift w-[240px] shrink-0 rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-display text-lg font-semibold">{v.word}</div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${badge.cls}`}>{badge.label}</span>
                </div>
                <div className="font-mono text-xs text-muted-foreground">{v.ipa}</div>
                <div className="mt-2 line-clamp-2 text-sm text-foreground/80">{v.vietnameseMeaning}</div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
