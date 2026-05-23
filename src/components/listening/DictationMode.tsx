import { useState, useRef } from "react";
import { ArrowLeft, Play, Pause, Volume2, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { ListeningMaterial } from "@/mock";
import { useListeningStore } from "@/store/useListeningStore";
import { AudioPlayer } from "./AudioPlayer";
import { DictationResult } from "./DictationResult";

export function DictationMode({
  material,
  onBack,
}: {
  material: ListeningMaterial;
  onBack: () => void;
}) {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState<Array<{ correct: boolean; accuracy: number }>>([]);
  const [mode, setMode] = useState<"playing" | "listening" | "inputting" | "reviewing">("playing");
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentSentence = material.sentences[currentSentenceIndex];
  const progress = ((currentSentenceIndex + 1) / material.sentences.length) * 100;
  const totalCorrect = results.filter((r) => r.correct).length;
  const avgAccuracy = results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / results.length) : 0;

  const { endSession } = useListeningStore();

  const handlePlaySentence = () => {
    setIsPlaying(true);
    setMode("listening");
    setTimeout(() => {
      setIsPlaying(false);
      setMode("inputting");
      inputRef.current?.focus();
    }, (currentSentence.duration || 4) * 1000 / playbackSpeed);
  };

  const handleSubmitAnswer = () => {
    const userWords = userInput.trim().toLowerCase().split(/\s+/);
    const correctWords = currentSentence.correct_text.toLowerCase().split(/\s+/);
    const matchCount = userWords.filter((w, i) => w === correctWords[i]).length;
    const maxWords = Math.max(userWords.length, correctWords.length);
    const accuracy = Math.round((matchCount / Math.max(maxWords, 1)) * 100);

    const result = {
      correct: accuracy >= 80,
      accuracy,
    };

    setResults([...results, result]);
    setMode("reviewing");
  };

  const handleNextSentence = () => {
    if (currentSentenceIndex < material.sentences.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);
      setUserInput("");
      setMode("playing");
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    const session_id = `ls_${Date.now()}`;
    endSession(session_id, avgAccuracy, totalCorrect);
    onBack();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </button>
        <div className="text-center">
          <div className="text-xs font-medium text-muted-foreground">Câu {currentSentenceIndex + 1} / {material.sentences.length}</div>
          <h2 className="font-display text-lg font-semibold">{material.title}</h2>
        </div>
        <div className="w-20" />
      </div>

      {/* Progress bar */}
      <Progress value={progress} className="h-2" />

      {/* Audio Player */}
      <AudioPlayer
        sentence={currentSentence}
        isPlaying={isPlaying}
        onPlay={handlePlaySentence}
        playbackSpeed={playbackSpeed}
        onSpeedChange={setPlaybackSpeed}
        mode={mode}
      />

      {/* Input Section */}
      {mode === "inputting" ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <label className="block text-sm font-semibold">Gõ lại những gì bạn nghe:</label>
          <textarea
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                handleSubmitAnswer();
              }
            }}
            placeholder="Bắt đầu gõ..."
            className="min-h-[100px] w-full resize-y rounded-lg border border-border bg-card p-3 font-mono text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
          />
          <Button
            onClick={handleSubmitAnswer}
            disabled={!userInput.trim()}
            className="w-full bg-teal text-teal-foreground hover:bg-teal/90"
          >
            Kiểm tra
          </Button>
        </motion.div>
      ) : mode === "reviewing" ? (
        <DictationResult
          userText={userInput}
          correctText={currentSentence.correct_text}
          accuracy={results[results.length - 1].accuracy}
          onNext={handleNextSentence}
          isLastSentence={currentSentenceIndex === material.sentences.length - 1}
        />
      ) : null}

      {/* Stats */}
      {results.length > 0 && (
        <div className="grid grid-cols-3 gap-3 rounded-lg border border-border bg-card/50 p-3">
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Đúng</div>
            <div className="font-display text-xl font-semibold text-teal">{totalCorrect}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Độ chính xác</div>
            <div className="font-display text-xl font-semibold text-amber">{avgAccuracy}%</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Tiến độ</div>
            <div className="font-display text-xl font-semibold text-indigo">{Math.round(progress)}%</div>
          </div>
        </div>
      )}
    </div>
  );
}
