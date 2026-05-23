import { BookOpen, BookMarked, Highlighter, ChartBar as BarChart, Play, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useReadingStore } from "@/store/useReadingStore";

export function ReadingDashboard() {
  const { sessions } = useReadingStore();

  const articlesInProgress = sessions.filter(
    (s) => s.status === "in_progress" || (s.status === "completed" && s.completed_at && Date.now() - s.completed_at < 604800000)
  ).length;

  const vocabularySaved = sessions.reduce((sum, s) => sum + s.vocabulary_learned, 0);

  const avgScore = sessions.length
    ? Math.round(
        sessions
          .filter((s) => s.quiz_score !== undefined)
          .reduce((sum, s) => sum + ((s.quiz_score || 0) / (s.quiz_total || 1)) * 100, 0) /
          sessions.filter((s) => s.quiz_score !== undefined).length || 0
      )
    : 0;

  return (
    <section className="space-y-5">
      {/* Reading Workspace Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-amber/10 via-background to-muted p-6 md:p-8">
        {/* Paper Texture Effect */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 17px, currentColor 17px, currentColor 18px)`,
          }} />
        </div>

        {/* Floating Article Cards */}
        <div className="absolute right-4 top-4 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-48 rounded-lg border border-border bg-card p-3 shadow-md"
          >
            <div className="mb-2 flex items-center gap-1.5">
              <span className="rounded bg-teal/15 px-1.5 py-0.5 text-[9px] font-semibold text-teal">B2</span>
              <span className="text-[9px] text-muted-foreground">Technology</span>
            </div>
            <div className="h-2 w-3/4 rounded bg-muted" />
            <div className="mt-1 h-2 w-1/2 rounded bg-muted" />
            <div className="mt-2 flex items-center gap-1">
              <Highlighter className="h-3 w-3 text-teal" />
              <span className="text-[9px] text-muted-foreground">3 từ đã highlight</span>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1.5 text-xs font-semibold text-teal">
            <BookOpen className="h-3.5 w-3.5" />
            Reading Workspace
          </div>

          <h1 className="font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
            Đọc sâu hơn, hiểu nhanh hơn
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
            Đọc bài viết, tra từ ngay trong ngữ cảnh, lưu highlight và luyện comprehension với AI mô phỏng.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              onClick={() => {
                const btn = document.querySelector('[data-tab-trigger="today"]') as HTMLButtonElement;
                if (btn) btn.click();
              }}
              size="lg"
              className="bg-teal text-teal-foreground hover:bg-teal/90"
            >
              <Play className="mr-2 h-4 w-4" />
              Tiếp tục đọc
            </Button>
            <Button
              onClick={() => {
                const btn = document.querySelector('[data-tab-trigger="packs"]') as HTMLButtonElement;
                if (btn) btn.click();
              }}
              variant="outline"
              size="lg"
            >
              <Search className="mr-2 h-4 w-4" />
              Khám phá bài mới
            </Button>
          </div>
        </div>
      </div>

      {/* Reading-Specific Insight Cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <InsightCard icon={BookOpen} label="Đang đọc" value={`${articlesInProgress} bài`} />
        <InsightCard icon={BookMarked} label="Từ đã lưu từ bài đọc" value={`${vocabularySaved} từ`} />
        <InsightCard icon={BarChart} label="Độ hiểu bài" value={`${avgScore}%`} />
        <InsightCard icon={Highlighter} label="Highlight tuần này" value="18 đoạn" />
      </div>
    </section>
  );
}

function InsightCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-teal/30 hover:shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber/10 text-amber">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="font-display text-lg font-semibold leading-tight">{value}</div>
        </div>
      </div>
    </div>
  );
}
