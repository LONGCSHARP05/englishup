import { motion } from "framer-motion";
import { CircleCheck, CircleAlert, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DictationResult({
  userText,
  correctText,
  accuracy,
  onNext,
  isLastSentence,
}: {
  userText: string;
  correctText: string;
  accuracy: number;
  onNext: () => void;
  isLastSentence: boolean;
}) {
  const userWords = userText.trim().toLowerCase().split(/\s+/);
  const correctWords = correctText.toLowerCase().split(/\s+/);

  const maxWords = Math.max(userWords.length, correctWords.length);
  const wordComparisons = Array.from({ length: maxWords }).map((_, i) => ({
    user: userWords[i] || "",
    correct: correctWords[i] || "",
    match: userWords[i] && correctWords[i] ? userWords[i] === correctWords[i] : false,
    missing: !userWords[i] && correctWords[i],
    extra: userWords[i] && !correctWords[i],
  }));

  const resultColor =
    accuracy >= 90
      ? "bg-teal/15 text-teal"
      : accuracy >= 70
        ? "bg-amber/15 text-amber"
        : "bg-coral/15 text-coral";

  const resultIcon =
    accuracy >= 90
      ? CircleCheck
      : CircleAlert;

  const ResultIcon = resultIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Accuracy Score */}
      <div className={`rounded-lg border border-current/20 ${resultColor} p-4 text-center`}>
        <div className="flex items-center justify-center gap-2 mb-1">
          <ResultIcon className="h-5 w-5" />
          <span className="font-semibold">
            {accuracy >= 90 ? "Tuyệt vời!" : accuracy >= 70 ? "Tốt" : "Cần cải thiện"}
          </span>
        </div>
        <div className="font-display text-3xl font-bold">{accuracy}%</div>
      </div>

      {/* Word-by-word Comparison */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Phân tích từng từ:</h3>
        <div className="flex flex-wrap gap-1.5 rounded-lg border border-border bg-card/50 p-3">
          {wordComparisons.map((comp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group relative"
            >
              {comp.match ? (
                <span className="rounded-full bg-teal/20 px-2.5 py-1 text-xs font-medium text-teal">
                  {comp.correct}
                </span>
              ) : comp.missing ? (
                <span className="rounded-full border-2 border-dashed border-coral/50 px-2.5 py-1 text-xs font-medium text-coral/60">
                  [{comp.correct}]
                </span>
              ) : comp.extra ? (
                <span className="rounded-full border-2 border-dashed border-amber/50 bg-amber/5 px-2.5 py-1 text-xs font-medium text-amber/70 line-through">
                  {comp.user}
                </span>
              ) : (
                <div className="rounded-full border-2 border-coral/30 bg-coral/5 px-2.5 py-1">
                  <span className="text-xs font-medium text-coral/70 line-through">{comp.user}</span>
                  <span className="ml-1 text-xs font-semibold text-coral">{comp.correct}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-teal" />
          <span className="text-muted-foreground">Đúng</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full border-2 border-coral/50" />
          <span className="text-muted-foreground">Thiếu</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full border-2 border-amber/50" />
          <span className="text-muted-foreground">Thừa</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full border-2 border-coral/50 bg-coral/5" />
          <span className="text-muted-foreground">Sai</span>
        </div>
      </div>

      {/* Correct Answer */}
      <div className="rounded-lg border border-border bg-teal/5 p-3">
        <div className="text-xs font-semibold text-muted-foreground">Câu đúng:</div>
        <p className="mt-1 text-sm font-medium text-foreground">{correctText}</p>
      </div>

      {/* Action Button */}
      <Button
        onClick={onNext}
        className="w-full bg-teal text-teal-foreground hover:bg-teal/90"
      >
        {isLastSentence ? (
          <>
            Hoàn thành bài học
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        ) : (
          <>
            Câu tiếp theo
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </motion.div>
  );
}
