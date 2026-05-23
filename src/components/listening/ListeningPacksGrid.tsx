import { Headphones, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const listeningPacks = [
  { id: "lp1", title: "IELTS Listening Practice", lessons: 15, level: "B2", isPremium: true, completed: 3 },
  { id: "lp2", title: "Daily English Conversations", lessons: 20, level: "A2", isPremium: false, completed: 8 },
  { id: "lp3", title: "Business English Podcast", lessons: 10, level: "B2", isPremium: true, completed: 0 },
  { id: "lp4", title: "English Movie Clips", lessons: 8, level: "B1", isPremium: false, completed: 2 },
  { id: "lp5", title: "TED Talks in English", lessons: 12, level: "B2", isPremium: false, completed: 1 },
  { id: "lp6", title: "BBC Learning English", lessons: 25, level: "B1", isPremium: true, completed: 5 },
];

export function ListeningPacksGrid() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card/50 p-4">
        <p className="text-sm text-muted-foreground">
          Chọn một bộ luyện nghe để phát triển kỹ năng nghe từng chủ đề riêng biệt.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {listeningPacks.map((pack) => (
          <PackCard key={pack.id} pack={pack} />
        ))}
      </div>
    </div>
  );
}

function PackCard({ pack }: { pack: typeof listeningPacks[0] }) {
  const levelColor = {
    A1: "bg-teal/15 text-teal",
    A2: "bg-indigo/15 text-indigo",
    B1: "bg-amber/20 text-amber",
    B2: "bg-coral/15 text-coral",
    C1: "bg-coral/15 text-coral",
  }[pack.level];

  const completionPercent = Math.round((pack.completed / pack.lessons) * 100);

  return (
    <div className="card-lift overflow-hidden rounded-xl border border-border bg-card shadow-card">
      <div className="space-y-3 p-4">
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

        <div className="flex items-center justify-between gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${levelColor}`}>
            {pack.level}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {pack.lessons} bài
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Tiến độ</span>
            <span className="font-semibold text-foreground">{completionPercent}%</span>
          </div>
          <Progress value={completionPercent} className="h-1.5" />
          <div className="text-[10px] text-muted-foreground">
            {pack.completed} / {pack.lessons} bài
          </div>
        </div>

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
          ) : (
            <>
              <Headphones className="mr-1.5 h-3.5 w-3.5" />
              Tiếp tục
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
