import { Play, Pause, Volume2, FastForward } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { DictationSentence } from "@/mock";

export function AudioPlayer({
  sentence,
  isPlaying,
  onPlay,
  playbackSpeed,
  onSpeedChange,
  mode,
}: {
  sentence: DictationSentence;
  isPlaying: boolean;
  onPlay: () => void;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
  mode: "playing" | "listening" | "inputting" | "reviewing";
}) {
  const canPlay = mode === "playing";
  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5];

  return (
    <div className="space-y-4">
      {/* Waveform Visualization */}
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
            className="h-12 w-1 rounded-full bg-gradient-to-b from-teal to-indigo"
            style={{ transformOrigin: "center" }}
          />
        ))}
      </div>

      {/* Playback Controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <Button
            onClick={onPlay}
            disabled={!canPlay || isPlaying}
            size="lg"
            className="flex-1 bg-teal text-teal-foreground hover:bg-teal/90"
          >
            {isPlaying ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Đang phát
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Phát lại
              </>
            )}
          </Button>
          <span className="text-xs font-medium text-muted-foreground">
            {sentence.duration} giây
          </span>
        </div>

        {/* Speed Control */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <FastForward className="h-3.5 w-3.5" />
            Tốc độ: {playbackSpeed}x
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {speedOptions.map((speed) => (
              <button
                key={speed}
                onClick={() => onSpeedChange(speed)}
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

        {/* Volume Control */}
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card/50 px-3 py-2">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="80"
            className="flex-1 cursor-pointer"
          />
        </div>
      </div>

      {/* Transcript Preview */}
      {mode === "listening" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-lg border border-border bg-indigo/5 p-3"
        >
          <p className="text-center text-sm italic text-muted-foreground">
            Lắng nghe và ghi chú nội dung...
          </p>
        </motion.div>
      )}
    </div>
  );
}
