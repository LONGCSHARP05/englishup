import { motion } from "framer-motion";
import { Sparkles, Headphones, ArrowRight, Trophy, Clock, BookOpen, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Lesson } from "@/mock/lessons";
import { getProgress, useLessonStore } from "@/store/useLessonStore";

export function EndLessonCard({ lesson }: { lesson: Lesson }) {
  const state = useLessonStore();
  const p = getProgress(state, lesson.id);
  const studyMin = Math.max(1, Math.round(p.studySeconds / 60));
  const accuracy = 86 + (lesson.id.length % 8); // mock stable
  const xp = 120;
  const ruby = 8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4 }}
      className="mt-12 rounded-3xl border border-border bg-gradient-to-br from-teal/15 via-card to-indigo/15 p-6 text-center shadow-card sm:p-10"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber/20 text-amber">
        <Trophy className="h-7 w-7" />
      </div>
      <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
        Bạn đã hoàn thành bài học 🎉
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Tuyệt vời! Đây là kết quả phiên học của bạn.
      </p>

      <div className="mx-auto mt-6 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat icon={Sparkles} label="Độ chính xác" value={`${accuracy}%`} tone="teal" />
        <Stat icon={BookOpen} label="Từ mới" value={String(p.savedWordIds.length || lesson.keyVocabulary.length)} tone="indigo" />
        <Stat icon={Clock} label="Thời gian" value={`${studyMin}p`} tone="amber" />
        <Stat icon={Gem} label="XP / Ruby" value={`${xp} / ${ruby}`} tone="coral" />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Button className="btn-press gap-1.5">
          <Sparkles className="h-4 w-4" /> Ôn flashcard
        </Button>
        <Button variant="outline" className="btn-press gap-1.5">
          <Headphones className="h-4 w-4" /> Luyện dictation
        </Button>
        <Button variant="secondary" className="btn-press gap-1.5">
          Bài tiếp theo <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: "teal" | "indigo" | "amber" | "coral";
}) {
  const map = {
    teal: "bg-teal/10 text-teal",
    indigo: "bg-indigo/10 text-indigo",
    amber: "bg-amber/15 text-amber",
    coral: "bg-coral/10 text-coral",
  } as const;
  return (
    <div className="rounded-2xl border border-border bg-card p-3 text-left shadow-card">
      <div className={`mb-1 inline-flex h-7 w-7 items-center justify-center rounded-lg ${map[tone]}`}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="text-lg font-semibold">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}