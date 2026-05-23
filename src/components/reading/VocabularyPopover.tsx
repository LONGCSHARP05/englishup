import { useState } from "react";
import { X, Volume2, Bookmark, BookmarkCheck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { VocabItem } from "@/mock";

export function VocabularyPopover({
  word,
  onClose,
}: {
  word: VocabItem;
  onClose: () => void;
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const difficultyColor = {
    1: "bg-teal/15 text-teal",
    2: "bg-indigo/15 text-indigo",
    3: "bg-amber/20 text-amber",
    4: "bg-coral/15 text-coral",
    5: "bg-coral/15 text-coral",
  }[word.difficulty];

  const handlePlayPronunciation = () => {
    setIsPlaying(true);
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlaying(false), 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="w-full max-w-md space-y-4 rounded-xl border border-border bg-card p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-display text-xl font-bold">{word.word}</h3>
            <p className="text-sm text-muted-foreground">{word.ipa}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Meaning */}
        <div className="space-y-2">
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <div className="text-xs font-semibold text-muted-foreground">Tiếng Việt</div>
            <p className="mt-0.5 font-medium text-foreground">{word.vietnameseMeaning}</p>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <div className="text-xs font-semibold text-muted-foreground">English</div>
            <p className="mt-0.5 text-sm text-foreground">{word.englishDefinition}</p>
          </div>
        </div>

        {/* Example */}
        <div className="rounded-lg border border-teal/30 bg-teal/5 p-3">
          <div className="text-xs font-semibold text-teal">Ví dụ</div>
          <p className="mt-0.5 text-sm italic text-foreground">{word.exampleSentence}</p>
        </div>

        {/* Difficulty Badge */}
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${difficultyColor}`}>
            Độ khó {word.difficulty}/5
          </span>
        </div>

        {/* Collocations */}
        {word.collocations.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground">Collocations</div>
            <div className="flex flex-wrap gap-1.5">
              {word.collocations.map((col, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {col}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={handlePlayPronunciation}
            variant="outline"
            className="flex-1"
          >
            <Volume2 className={`mr-1.5 h-4 w-4 ${isPlaying ? "animate-pulse" : ""}`} />
            Phát âm
          </Button>
          <Button
            onClick={() => setIsSaved(!isSaved)}
            variant={isSaved ? "default" : "outline"}
            className="flex-1"
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="mr-1.5 h-4 w-4" />
                Đã lưu
              </>
            ) : (
              <>
                <Bookmark className="mr-1.5 h-4 w-4" />
                Lưu từ
              </>
            )}
          </Button>
        </div>

        {/* View in Vocabulary */}
        <button
          onClick={() => {
            onClose();
          }}
          className="flex w-full items-center justify-center gap-1.5 rounded-md py-2 text-sm font-medium text-teal hover:bg-teal/10"
        >
          Xem trong từ vựng
          <ChevronRight className="h-4 w-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}
