import { motion } from "framer-motion";
import { Sparkles, BookOpen, Headphones, Zap, RotateCcw, Clock, Bookmark, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Lesson, LessonWord } from "@/mock/lessons";
import { useLessonStore, getProgress } from "@/store/useLessonStore";

export function AiSidebar({
  lesson,
  onWordClick,
}: {
  lesson: Lesson;
  onWordClick: (w: LessonWord) => void;
}) {
  const state = useLessonStore();
  const p = getProgress(state, lesson.id);
  const studyMin = Math.max(1, Math.round(p.studySeconds / 60));

  return (
    <aside className="space-y-4">
      {/* AI Summary */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-gradient-to-br from-indigo/10 to-teal/10 p-4 shadow-card"
      >
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-indigo" /> AI tóm tắt
        </div>
        <p className="mt-2 text-sm leading-6 text-foreground/90">{lesson.summary}</p>
      </motion.div>

      {/* Key vocab */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <BookOpen className="h-4 w-4 text-teal" /> Từ vựng chính
          </div>
          <Badge variant="secondary" className="rounded-full">{lesson.keyVocabulary.length}</Badge>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {lesson.keyVocabulary.slice(0, 10).map((w) => (
            <button
              key={w.word}
              type="button"
              onClick={() => onWordClick(w)}
              className="rounded-full bg-teal/10 px-2.5 py-1 text-xs font-medium text-teal hover:bg-teal/20"
            >
              {w.word}
            </button>
          ))}
        </div>
      </div>

      {/* Grammar */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Layers className="h-4 w-4 text-amber" /> Ngữ pháp
        </div>
        <div className="space-y-2">
          {lesson.grammarNotes.map((g) => (
            <div key={g.id} className="rounded-xl border border-border bg-muted/30 p-3">
              <div className="text-sm font-semibold">{g.title}</div>
              <code className="mt-1 block break-words font-mono text-[11px] text-indigo">{g.pattern}</code>
              <p className="mt-1 text-xs text-muted-foreground">{g.explanation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Zap className="h-4 w-4 text-coral" /> Hành động nhanh
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="btn-press justify-start gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> Flashcard
          </Button>
          <Button variant="outline" size="sm" className="btn-press justify-start gap-1.5">
            <Headphones className="h-3.5 w-3.5" /> Dictation
          </Button>
          <Button variant="outline" size="sm" className="btn-press justify-start gap-1.5">
            <Zap className="h-3.5 w-3.5" /> Quiz nhanh
          </Button>
          <Button variant="outline" size="sm" className="btn-press justify-start gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" /> Ôn từ mới
          </Button>
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-sm font-semibold">Tiến độ học</div>
          <span className="text-xs font-medium text-foreground">{p.percent}%</span>
        </div>
        <Progress value={p.percent} className="h-2" />
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg bg-muted/40 p-2">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Bookmark className="h-3 w-3" /> Từ đã lưu
            </div>
            <div className="mt-0.5 text-sm font-semibold">{p.savedWordIds.length}</div>
          </div>
          <div className="rounded-lg bg-muted/40 p-2">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" /> Thời gian
            </div>
            <div className="mt-0.5 text-sm font-semibold">{studyMin} phút</div>
          </div>
        </div>
      </div>
    </aside>
  );
}