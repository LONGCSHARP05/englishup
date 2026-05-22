import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Check, Loader2, BookOpen } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { getLessonById, type LessonWord } from "@/mock/lessons";
import { LessonHeader } from "@/components/lesson/LessonHeader";
import { LessonContent } from "@/components/lesson/LessonContent";
import { AiSidebar } from "@/components/lesson/AiSidebar";
import { VocabDrawer } from "@/components/lesson/VocabDrawer";
import { SelectionMenu } from "@/components/lesson/SelectionMenu";
import { EndLessonCard } from "@/components/lesson/EndLessonCard";
import { LessonSkeleton } from "@/components/lesson/LessonSkeleton";
import { useLessonStore, getProgress } from "@/store/useLessonStore";
import { useVocabStore } from "@/store/useVocabStore";
import { toast } from "sonner";

export const Route = createFileRoute("/lesson/$lessonId")({
  head: ({ params }) => ({
    meta: [
      { title: `Bài học — EnglishUp` },
      { name: "description", content: `Trải nghiệm học bài ${params.lessonId} với AI gợi ý từ vựng và ngữ pháp.` },
    ],
  }),
  component: LessonPage,
});

function LessonPage() {
  const { lessonId } = Route.useParams();
  const lesson = useMemo(() => getLessonById(lessonId), [lessonId]);

  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, [lessonId]);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [activeWord, setActiveWord] = useState<LessonWord | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [savedToastShown, setSavedToastShown] = useState(false);

  const setPercent = useLessonStore((s) => s.setPercent);
  const addStudyTime = useLessonStore((s) => s.addStudyTime);
  const saveWord = useLessonStore((s) => s.saveWord);
  const progress = useLessonStore((s) => (lesson ? getProgress(s, lesson.id) : undefined));
  const addVocab = useVocabStore((s) => s.addWord);

  // Track scroll progress within content area
  useEffect(() => {
    if (!lesson) return;
    const lessonId2 = lesson.id;
    function onScroll() {
      const el = contentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = el.offsetHeight - viewportH * 0.4;
      const scrolled = Math.max(0, viewportH * 0.4 - rect.top);
      const pct = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
      setScrollProgress(pct);
      setPercent(lessonId2, pct);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lesson, setPercent]);

  // Study timer
  useEffect(() => {
    if (!lesson) return;
    const i = window.setInterval(() => addStudyTime(lesson.id, 15), 15000);
    return () => window.clearInterval(i);
  }, [lesson, addStudyTime]);

  // "Đã lưu tiến trình" toast every 30%
  useEffect(() => {
    if (!lesson) return;
    if (scrollProgress > 25 && !savedToastShown) {
      setSavedToastShown(true);
      toast.success("Đã lưu tiến trình", { duration: 1500 });
    }
  }, [scrollProgress, savedToastShown, lesson]);

  function handleOpenWord(w: LessonWord) {
    setActiveWord(w);
    setDrawerOpen(true);
  }

  function handleSaveWord(w: LessonWord) {
    if (!lesson) return;
    saveWord(lesson.id, w.word.toLowerCase());
    addVocab({
      word: w.word,
      ipa: w.ipa,
      vietnameseMeaning: w.vietnameseMeaning,
      englishDefinition: w.englishDefinition,
      exampleSentence: w.example,
      collocations: w.collocations,
      difficulty: w.difficulty,
    });
    toast.success(`Đã thêm “${w.word}” vào bộ từ`);
  }

  function scrollToContent() {
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (isLoading) return <LessonSkeleton />;

  if (hasError) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-3 p-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h2 className="font-display text-xl font-semibold">Không tải được bài học</h2>
        <p className="text-sm text-muted-foreground">
          Có lỗi xảy ra khi tải nội dung. Vui lòng thử lại.
        </p>
        <Button onClick={() => setError(false)}>Thử lại</Button>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-3 p-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <BookOpen className="h-7 w-7" />
        </div>
        <h2 className="font-display text-xl font-semibold">Bài học chưa sẵn sàng</h2>
        <p className="text-sm text-muted-foreground">
          Tài liệu này có thể đang được AI xử lý hoặc chưa tồn tại.
        </p>
        <Button asChild>
          <Link to="/library">Quay lại thư viện</Link>
        </Button>
      </div>
    );
  }

  const shouldShowEnd = (progress?.percent ?? 0) >= 80;

  return (
    <TooltipProvider delayDuration={150}>
      {/* Top scroll progress bar */}
      <div className="sticky top-0 z-30 h-1 w-full bg-transparent">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-teal to-indigo"
          style={{ scaleX: scrollProgress / 100 }}
          transition={{ duration: 0.15 }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-3 pb-16 pt-4 sm:px-6">
        <LessonHeader lesson={lesson} onContinue={scrollToContent} />

        <div className="mt-6 grid w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px]">
          <div
            ref={contentRef}
            id="lesson-content"
            className="min-w-0 max-w-full"
          >
            <article className="prose prose-neutral mx-auto max-w-[680px] dark:prose-invert">
              <LessonContent lesson={lesson} onOpenWord={handleOpenWord} onSaveWord={handleSaveWord} />
            </article>

            <AnimatePresence>
              {shouldShowEnd && <EndLessonCard key="end" lesson={lesson} />}
            </AnimatePresence>
          </div>

          <div className="min-w-0 lg:sticky lg:top-6 lg:self-start">
            <AiSidebar lesson={lesson} onWordClick={handleOpenWord} />
          </div>
        </div>

        {/* Saved indicator */}
        <AnimatePresence>
          {savedToastShown && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none fixed bottom-24 left-1/2 hidden -translate-x-1/2 items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-xs text-muted-foreground shadow-card backdrop-blur md:bottom-6 md:flex"
            >
              <Check className="h-3 w-3 text-teal" />
              Tự động lưu tiến trình
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SelectionMenu containerId="lesson-content" lessonId={lesson.id} />
      <VocabDrawer
        word={activeWord}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onSave={handleSaveWord}
      />
    </TooltipProvider>
  );
}

// Mark as used to silence linter for icon kept for processing fallback
void Loader2;