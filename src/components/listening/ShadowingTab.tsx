import { useState } from "react";
import { Play, Pause, FastForward, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { mockListeningMaterials } from "@/mock";

export function ShadowingTab() {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const shadowingMaterials = mockListeningMaterials.filter((m) => m.type === "shadowing");
  const selectedMaterial = shadowingMaterials.find((m) => m.id === selectedMaterialId);
  const currentSentence = selectedMaterial?.sentences[currentSentenceIndex];

  if (!selectedMaterial) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <p className="text-sm text-muted-foreground">
            Shadowing là kỹ thuật nói theo sau người nói trong lúc họ phát âm. Cố gắng bắt kịp tốc độ của người nói để cải thiện phát âm và ngôn điệu.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {shadowingMaterials.map((material) => (
            <div
              key={material.id}
              onClick={() => {
                setSelectedMaterialId(material.id);
                setCurrentSentenceIndex(0);
              }}
              className="card-lift cursor-pointer overflow-hidden rounded-xl border border-border bg-card p-4 shadow-card transition-all hover:border-teal/50"
            >
              <h3 className="font-display text-sm font-semibold line-clamp-2">
                {material.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">{material.topic}</p>
              <div className="mt-3 flex items-center justify-between gap-2 text-xs">
                <span className="rounded-full bg-teal/15 px-2 py-0.5 font-semibold text-teal">
                  {material.level}
                </span>
                <span className="text-muted-foreground">{material.duration_minutes} phút</span>
              </div>
              <Button className="mt-3 w-full bg-teal text-teal-foreground hover:bg-teal/90" size="sm">
                <Play className="mr-1.5 h-3.5 w-3.5" />
                Bắt đầu
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const progress = ((currentSentenceIndex + 1) / selectedMaterial.sentences.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <button
          onClick={() => setSelectedMaterialId(null)}
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Quay lại
        </button>
        <div>
          <h2 className="font-display text-xl font-semibold">{selectedMaterial.title}</h2>
          <p className="text-sm text-muted-foreground">
            Câu {currentSentenceIndex + 1} / {selectedMaterial.sentences.length}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          animate={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-teal to-indigo"
        />
      </div>

      {/* Waveform */}
      <div className="flex items-end justify-center gap-1 rounded-lg border border-border bg-card/50 p-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={isPlaying ? { scaleY: [0.3, 1, 0.3] } : { scaleY: 0.5 }}
            transition={{
              duration: 0.6,
              delay: i * 0.05,
              repeat: isPlaying ? Infinity : 0,
            }}
            className="h-12 w-1 rounded-full bg-gradient-to-b from-indigo to-teal"
          />
        ))}
      </div>

      {/* Controls */}
      <div className="space-y-3">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          size="lg"
          className="w-full bg-teal text-teal-foreground hover:bg-teal/90"
        >
          {isPlaying ? (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Tạm dừng
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Phát
            </>
          )}
        </Button>

        {/* Speed Control */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <FastForward className="h-3.5 w-3.5" />
            Tốc độ: {playbackSpeed}x
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {[0.5, 0.75, 1, 1.25, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`btn-press rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
                  playbackSpeed === speed
                    ? "bg-teal text-teal-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transcript */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Phụ đề:</h3>
        <motion.div
          key={currentSentenceIndex}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-border bg-card p-4 text-center leading-relaxed"
        >
          <p className="font-display text-lg font-semibold text-foreground">
            {currentSentence?.correct_text}
          </p>
          <p className="mt-2 text-sm text-muted-foreground italic">
            (Nói theo sau và cố gắng bắt kịp tốc độ)
          </p>
        </motion.div>
      </div>

      {/* Tip */}
      <div className="rounded-lg border border-amber/30 bg-amber/5 p-3">
        <div className="flex gap-2">
          <Lightbulb className="h-4 w-4 shrink-0 text-amber" />
          <div>
            <p className="text-xs font-semibold text-amber">Mẹo</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Bắt đầu ở tốc độ 0.75x hoặc 0.5x rồi từ từ tăng tốc độ khi quen thuộc.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          onClick={() => setCurrentSentenceIndex(Math.max(0, currentSentenceIndex - 1))}
          disabled={currentSentenceIndex === 0}
          variant="outline"
          className="flex-1"
        >
          Câu trước
        </Button>
        <Button
          onClick={() =>
            setCurrentSentenceIndex(
              Math.min(selectedMaterial.sentences.length - 1, currentSentenceIndex + 1)
            )
          }
          disabled={currentSentenceIndex === selectedMaterial.sentences.length - 1}
          className="flex-1 bg-teal text-teal-foreground hover:bg-teal/90"
        >
          Câu tiếp theo
        </Button>
      </div>
    </div>
  );
}
