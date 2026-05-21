import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { VocabItem } from "@/mock";

type Props = {
  word: VocabItem;
  flipped: boolean;
  onFlip: () => void;
};

export function Flashcard({ word, flipped, onFlip }: Props) {
  // reset is handled by parent re-mount via key
  const [hovering, setHovering] = useState(false);
  useEffect(() => setHovering(false), [word.id]);

  return (
    <div
      className="relative mx-auto w-full max-w-xl [perspective:1400px]"
      style={{ height: 360 }}
    >
      <motion.button
        type="button"
        onClick={onFlip}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0.0, 0.2, 1] }}
        className="relative h-full w-full rounded-2xl text-left [transform-style:preserve-3d]"
        aria-label="Lật thẻ"
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-6 shadow-card [backface-visibility:hidden]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <DifficultyPill level={word.difficulty} />
          <div className="font-display text-4xl font-semibold sm:text-5xl break-words text-center">
            {word.word}
          </div>
          <div className="font-mono text-sm text-muted-foreground">{word.ipa}</div>
          <div className="mt-4 text-xs text-muted-foreground">
            {hovering ? "Nhấn để lật" : "Phím Space để lật"}
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col gap-3 overflow-y-auto rounded-2xl border border-teal/30 bg-card p-5 sm:p-6 shadow-card [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="font-display text-xl font-semibold truncate">
                {word.word}
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                {word.ipa}
              </div>
            </div>
            <DifficultyPill level={word.difficulty} />
          </div>

          <div className="text-base font-semibold text-teal">
            {word.vietnameseMeaning}
          </div>
          <div className="text-sm text-foreground/80">
            {word.englishDefinition}
          </div>

          <div className="rounded-lg bg-muted px-3 py-2 text-sm italic text-foreground/80">
            “{word.exampleSentence}”
          </div>

          {word.collocations.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {word.collocations.map((c) => (
                <span
                  key={c}
                  className="rounded-md bg-indigo/10 px-2 py-0.5 text-xs text-indigo"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.button>
    </div>
  );
}

function DifficultyPill({ level }: { level: number }) {
  const cls =
    level >= 4
      ? "bg-coral/15 text-coral"
      : level === 3
        ? "bg-amber/20 text-amber"
        : "bg-teal/15 text-teal";
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${cls}`}>
      Độ khó {level}/5
    </span>
  );
}