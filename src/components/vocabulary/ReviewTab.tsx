import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, RotateCcw, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Flashcard } from "./Flashcard";
import { StatusLegend } from "./StatusLegend";
import { useVocabStore, getDueWords, type Rating } from "@/store/useVocabStore";
import { toast } from "sonner";

type Props = { packFilter?: (id: string) => boolean };

export function ReviewTab({ packFilter }: Props) {
  const { vocab, rateWord } = useVocabStore();

  const initialQueue = useMemo(() => {
    const due = getDueWords(vocab);
    const list = packFilter ? due.filter((v) => packFilter(v.id)) : due;
    return list.map((v) => v.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packFilter]);

  const [queue, setQueue] = useState<string[]>(initialQueue);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [stats, setStats] = useState({ hard: 0, learning: 0, known: 0 });

  useEffect(() => {
    setQueue(initialQueue);
    setIndex(0);
    setFlipped(false);
    setStats({ hard: 0, learning: 0, known: 0 });
  }, [initialQueue]);

  const total = queue.length;
  const currentId = queue[index];
  const currentWord = vocab.find((v) => v.id === currentId);
  const done = total > 0 && index >= total;

  const handleRate = useCallback(
    (rating: Rating) => {
      if (!currentId) return;
      rateWord(currentId, rating);
      setStats((s) => ({ ...s, [rating]: s[rating] + 1 }));
      setDirection(1);
      setFlipped(false);
      setIndex((i) => i + 1);
    },
    [currentId, rateWord],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (done || !currentId) return;
      if (e.code === "Space") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === "ArrowLeft") {
        handleRate("hard");
      } else if (e.key === "ArrowDown") {
        handleRate("learning");
      } else if (e.key === "ArrowRight") {
        handleRate("known");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleRate, done, currentId]);

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal/10">
          <Inbox className="h-7 w-7 text-teal" />
        </div>
        <h3 className="font-display text-xl font-semibold">
          Tuyệt vời! Không còn thẻ cần ôn.
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Hãy quay lại sau hoặc thêm từ mới để tiếp tục học. Việc ôn tập đều
          đặn sẽ giúp bạn ghi nhớ lâu hơn.
        </p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card px-6 py-12 text-center shadow-card">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-amber/15">
          <Sparkles className="h-7 w-7 text-amber" />
        </div>
        <h3 className="font-display text-2xl font-semibold">Hoàn thành phiên ôn tập!</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Bạn đã ôn {total} thẻ trong phiên này.
        </p>
        <div className="mt-6 grid w-full max-w-md grid-cols-3 gap-3">
          <StatTile label="Khó" value={stats.hard} cls="text-coral bg-coral/10" />
          <StatTile label="Đang học" value={stats.learning} cls="text-amber bg-amber/10" />
          <StatTile label="Nhớ rồi" value={stats.known} cls="text-teal bg-teal/10" />
        </div>
        <Button
          className="mt-6"
          onClick={() => {
            const due = getDueWords(vocab);
            const list = packFilter ? due.filter((v) => packFilter(v.id)) : due;
            setQueue(list.map((v) => v.id));
            setIndex(0);
            setStats({ hard: 0, learning: 0, known: 0 });
            toast.success("Bắt đầu phiên mới");
          }}
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Ôn lại
        </Button>
      </div>
    );
  }

  if (!currentWord) return null;
  const progress = ((index + (flipped ? 0.5 : 0)) / total) * 100;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-medium text-foreground/80">
          {index + 1} / {total} thẻ
        </div>
        <StatusLegend />
      </div>
      <Progress value={progress} className="h-2" />

      <div className="relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentWord.id}
            custom={direction}
            initial={{ x: 80 * direction, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80 * direction, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <Flashcard
              word={currentWord}
              flipped={flipped}
              onFlip={() => setFlipped((f) => !f)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <RatingButton
          emoji="😰"
          label="Khó"
          hint="←"
          onClick={() => handleRate("hard")}
          className="bg-coral/10 text-coral hover:bg-coral/20"
        />
        <RatingButton
          emoji="🤔"
          label="Đang học"
          hint="↓"
          onClick={() => handleRate("learning")}
          className="bg-amber/15 text-amber hover:bg-amber/25"
        />
        <RatingButton
          emoji="✅"
          label="Nhớ rồi"
          hint="→"
          onClick={() => handleRate("known")}
          className="bg-teal/10 text-teal hover:bg-teal/20"
        />
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Phím tắt: <kbd className="rounded border bg-muted px-1">Space</kbd> lật ·{" "}
        <kbd className="rounded border bg-muted px-1">←</kbd> /{" "}
        <kbd className="rounded border bg-muted px-1">↓</kbd> /{" "}
        <kbd className="rounded border bg-muted px-1">→</kbd> đánh giá
      </p>
    </div>
  );
}

function StatTile({ label, value, cls }: { label: string; value: number; cls: string }) {
  return (
    <div className={`rounded-xl px-3 py-3 ${cls}`}>
      <div className="font-display text-2xl font-semibold">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  );
}

function RatingButton({
  emoji,
  label,
  hint,
  onClick,
  className,
}: {
  emoji: string;
  label: string;
  hint: string;
  onClick: () => void;
  className: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`btn-press flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-3 sm:py-4 font-semibold transition ${className}`}
    >
      <span className="text-2xl leading-none">{emoji}</span>
      <span className="text-sm">{label}</span>
      <span className="text-[10px] opacity-70">{hint}</span>
    </button>
  );
}