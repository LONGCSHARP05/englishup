import { motion } from "framer-motion";
import { FileText, Youtube, Globe, AlignLeft, Clock, BarChart3, Bookmark, CheckCircle2, Play, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Lesson } from "@/mock/lessons";
import { useLessonStore, getProgress } from "@/store/useLessonStore";
import { toast } from "sonner";

const sourceIcon = { pdf: FileText, youtube: Youtube, article: Globe, paste: AlignLeft } as const;
const sourceClass = {
  pdf: "bg-indigo/15 text-indigo",
  youtube: "bg-coral/15 text-coral",
  article: "bg-teal/15 text-teal",
  paste: "bg-muted text-muted-foreground",
} as const;

export function LessonHeader({ lesson, onContinue }: { lesson: Lesson; onContinue: () => void }) {
  const state = useLessonStore();
  const p = getProgress(state, lesson.id);
  const Icon = sourceIcon[lesson.source];

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-teal/8 via-card to-indigo/8 p-5 shadow-card sm:p-7"
    >
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-indigo/10 blur-3xl" />

      <div className="relative">
        <Link
          to="/library"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Thư viện
        </Link>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge className={`gap-1 ${sourceClass[lesson.source]} border-0`}>
            <Icon className="h-3 w-3" />
            {lesson.sourceLabel}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <BarChart3 className="h-3 w-3" /> {lesson.difficulty}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" /> {lesson.estimatedMinutes} phút đọc
          </Badge>
        </div>

        <h1 className="mt-3 font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
          {lesson.title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{lesson.summary}</p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1 max-w-md">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Tiến độ học</span>
              <span className="font-medium text-foreground">{p.percent}%</span>
            </div>
            <Progress value={p.percent} className="h-2" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" onClick={onContinue} className="btn-press gap-1.5">
              <Play className="h-4 w-4" /> Tiếp tục học
            </Button>
            <Button
              size="sm"
              variant={p.completed ? "secondary" : "outline"}
              onClick={() => {
                state.toggleComplete(lesson.id);
                toast.success(p.completed ? "Đã bỏ đánh dấu hoàn thành" : "Đã đánh dấu hoàn thành 🎉");
              }}
              className="btn-press gap-1.5"
            >
              <CheckCircle2 className="h-4 w-4" />
              {p.completed ? "Đã hoàn thành" : "Hoàn thành"}
            </Button>
            <Button
              size="icon"
              variant="outline"
              aria-label="Bookmark"
              onClick={() => {
                state.toggleBookmark(lesson.id);
                toast.success(p.bookmarked ? "Đã bỏ ghim" : "Đã ghim bài học");
              }}
              className="btn-press"
            >
              <Bookmark className={`h-4 w-4 ${p.bookmarked ? "fill-amber text-amber" : ""}`} />
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}