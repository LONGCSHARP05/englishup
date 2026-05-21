import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockVocabPacks } from "@/mock";

type Props = { onReviewPack: (packId: string) => void };

export function PacksTab({ onReviewPack }: Props) {
  // Simulated user-owned subset (first 4 packs)
  const userPacks = mockVocabPacks.slice(0, 4).map((p, i) => ({
    ...p,
    masteredCount: Math.round(p.wordCount * [0.42, 0.18, 0.65, 0.08][i]),
  }));

  if (userPacks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
        Bạn chưa sở hữu bộ từ nào. Hãy khám phá thư viện để bắt đầu.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {userPacks.map((p) => {
        const pct = Math.round((p.masteredCount / p.wordCount) * 100);
        return (
          <div
            key={p.id}
            className="card-lift overflow-hidden rounded-xl border border-border bg-card shadow-card"
          >
            <div className={`relative h-24 bg-gradient-to-br ${p.coverGradient}`}>
              <div className="absolute right-3 top-3 rounded-full bg-background/85 px-2 py-0.5 text-[10px] font-semibold">
                {p.level}
              </div>
            </div>
            <div className="space-y-3 p-4">
              <div>
                <h3 className="line-clamp-2 font-display text-base font-semibold">
                  {p.title}
                </h3>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {p.wordCount} từ
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {p.masteredCount}/{p.wordCount} từ đã thuộc
                  </span>
                  <span className="font-semibold text-teal">{pct}%</span>
                </div>
                <Progress value={pct} className="h-1.5" />
              </div>
              <Button
                onClick={() => onReviewPack(p.id)}
                className="w-full"
                size="sm"
              >
                <Play className="mr-1 h-4 w-4" /> Ôn tập
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}