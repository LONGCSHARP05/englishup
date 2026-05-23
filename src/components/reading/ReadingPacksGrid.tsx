import { BookOpen, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockReadingPacks } from "@/mock";

export function ReadingPacksGrid() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card/50 p-4">
        <p className="text-sm text-muted-foreground">
          Chọn bộ bài đọc phù hợp với mục tiêu học tập của bạn.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockReadingPacks.map((pack) => (
          <PackCard key={pack.id} pack={pack} />
        ))}
      </div>
    </div>
  );
}

function PackCard({ pack }: { pack: (typeof mockReadingPacks)[0] }) {
  const levelColor = {
    A1: "bg-teal/15 text-teal",
    A2: "bg-indigo/15 text-indigo",
    B1: "bg-amber/20 text-amber",
    B2: "bg-coral/15 text-coral",
    C1: "bg-coral/15 text-coral",
    C2: "bg-coral/15 text-coral",
  }[pack.level];

  const completionPercent = Math.round((pack.completed / pack.lessonCount) * 100);

  return (
    <div className="card-lift overflow-hidden rounded-xl border border-border bg-card shadow-card">
      {/* Gradient Cover */}
      <div className={`h-28 w-full bg-gradient-to-br ${pack.coverGradient}`} />

      <div className="space-y-3 p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-sm font-semibold line-clamp-2">
              {pack.title}
            </h3>
          </div>
          {pack.isPremium && (
            <div className="shrink-0 rounded-full bg-amber/15 p-1.5">
              <Lock className="h-3.5 w-3.5 text-amber" />
            </div>
          )}
        </div>

        {/* Level Badge */}
        <div className="flex items-center justify-between gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${levelColor}`}>
            {pack.level}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {pack.lessonCount} bài
          </span>
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Tiến độ</span>
            <span className="font-semibold text-foreground">{completionPercent}%</span>
          </div>
          <Progress value={completionPercent} className="h-1.5" />
          <div className="text-[10px] text-muted-foreground">
            {pack.completed} / {pack.lessonCount} bài
          </div>
        </div>

        {/* Button */}
        <Button
          disabled={pack.isPremium}
          className={`w-full ${
            pack.isPremium
              ? "cursor-not-allowed opacity-50"
              : "bg-teal text-teal-foreground hover:bg-teal/90"
          }`}
          size="sm"
        >
          {pack.isPremium ? (
            <>
              <Lock className="mr-1.5 h-3.5 w-3.5" />
              Bản cao cấp
            </>
          ) : completionPercent > 0 ? (
            <>
              <BookOpen className="mr-1.5 h-3.5 w-3.5" />
              Tiếp tục
            </>
          ) : (
            <>
              <BookOpen className="mr-1.5 h-3.5 w-3.5" />
              Bắt đầu
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
