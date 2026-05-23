import { Headphones, Target, AudioWaveform, ListMusic, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useListeningStore } from "@/store/useListeningStore";

export function ListeningDashboard() {
  const { sessions } = useListeningStore();

  const completedToday = sessions.filter(
    (s) => s.status === "completed" && s.completed_at && Date.now() - s.completed_at < 86400000
  ).length;

  const avgAccuracy = sessions.length
    ? Math.round(
        sessions.reduce((sum, s) => sum + s.overall_accuracy, 0) / sessions.length
      )
    : 0;

  const handleStartLesson = () => {
    const startButton = document.querySelector('[data-tab-trigger="dictation"]') as HTMLButtonElement;
    if (startButton) startButton.click();
  };

  return (
    <section className="space-y-5">
      {/* Listening Studio Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-teal/10 bg-gradient-to-br from-teal via-teal/90 to-indigo p-6 text-white shadow-lg md:p-8">
        {/* Waveform Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-0 top-0 h-full w-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ scaleY: [0.4, 0.8, 0.4] }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute bottom-0 h-16 w-2 rounded-full bg-white"
                style={{ left: `${i * 8 + 4}%`, transformOrigin: "bottom" }}
              />
            ))}
          </div>
        </div>

        {/* Floating Audio Dots */}
        <div className="absolute right-4 top-4 hidden md:block">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  repeat: Infinity,
                }}
                className="h-3 w-3 rounded-full bg-white/30"
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
            <Headphones className="h-3.5 w-3.5" />
            Listening Studio
          </div>

          <h1 className="font-display text-2xl font-bold leading-tight md:text-3xl">
            Luyện tai mỗi ngày, nghe rõ từng âm
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/85 md:text-base">
            Chọn một bài nghe, luyện transcript, dictation và nhận phản hồi AI mô phỏng để cải thiện kỹ năng nghe.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              onClick={handleStartLesson}
              className="bg-white text-teal hover:bg-white/90"
              size="lg"
            >
              <Play className="mr-2 h-4 w-4" />
              Bắt đầu bài nghe
            </Button>
            <Button
              onClick={() => {
                const btn = document.querySelector('[data-tab-trigger="packs"]') as HTMLButtonElement;
                if (btn) btn.click();
              }}
              variant="secondary"
              className="bg-white/15 text-white hover:bg-white/25"
              size="lg"
            >
              <ListMusic className="mr-2 h-4 w-4" />
              Vào Dictation
            </Button>
          </div>
        </div>
      </div>

      {/* Listening-Specific Metrics */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard icon={Headphones} label="Tai nghe hôm nay" value="18 phút" />
        <MetricCard icon={Target} label="Độ chính xác Dictation" value={`${avgAccuracy}%`} />
        <MetricCard icon={AudioWaveform} label="Âm dễ nhầm" value="/θ/ /ð/" />
        <MetricCard icon={ListMusic} label="Bài đang luyện" value={`${completedToday} bài`} />
      </div>
    </section>
  );
}

function MetricCard({
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
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
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
