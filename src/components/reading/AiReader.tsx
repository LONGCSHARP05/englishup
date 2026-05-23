import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Sun, Moon, Type, Settings, Volume2, Lightbulb, Sparkles, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { ReadingArticle, VocabItem } from "@/mock";
import { useReadingStore } from "@/store/useReadingStore";
import { VocabularyPopover } from "./VocabularyPopover";
import { AiAssistantSidebar } from "./AiAssistantSidebar";
import { ReadingQuiz } from "./ReadingQuiz";

type ReadingMode = "light" | "dark";

export function AiReader({
  article,
  onBack,
}: {
  article: ReadingArticle;
  onBack: () => void;
}) {
  const [readingMode, setReadingMode] = useState<ReadingMode>("light");
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [selectedWord, setSelectedWord] = useState<VocabItem | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(Date.now());

  const { updateReadingTime } = useReadingStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (startTimeRef.current) {
        const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
        updateReadingTime(article.id, elapsedSeconds);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [article.id, updateReadingTime]);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollTop = window.scrollY;
        const docHeight = contentRef.current.scrollHeight - window.innerHeight;
        const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setReadingProgress(Math.round(progress));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWordClick = (word: VocabItem) => {
    setSelectedWord(word);
  };

  if (showQuiz) {
    return (
      <ReadingQuiz
        article={article}
        onComplete={() => setShowQuiz(false)}
        onBack={() => setShowQuiz(false)}
      />
    );
  }

  const bgColor = readingMode === "dark" ? "bg-slate-900" : "bg-background";
  const textColor = readingMode === "dark" ? "text-slate-200" : "text-foreground";

  return (
    <div className={`min-h-screen ${bgColor} transition-colors`}>
      {/* Sticky Progress Bar */}
      <div className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 px-4 py-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Quay lại</span>
          </button>

          <div className="flex flex-1 items-center gap-3">
            <Progress value={readingProgress} className="h-1.5 flex-1 max-w-md" />
            <span className="text-xs font-medium text-muted-foreground">{readingProgress}%</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              onClick={() => setReadingMode(readingMode === "light" ? "dark" : "light")}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              {readingMode === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <ReadingSettings
                  fontSize={fontSize}
                  onFontSizeChange={setFontSize}
                  lineHeight={lineHeight}
                  onLineHeightChange={setLineHeight}
                />
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Sparkles className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <AiAssistantSidebar article={article} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-8" ref={contentRef}>
        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 space-y-4"
        >
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-teal/15 px-2 py-0.5 text-[10px] font-semibold text-teal">
              {article.level}
            </span>
            <span className="text-xs text-muted-foreground">{article.category}</span>
          </div>
          <h1 className="font-display text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{article.word_count} từ</span>
            <span>•</span>
            <span>{article.estimated_minutes} phút đọc</span>
          </div>
          <Separator className="my-4" />
        </motion.div>

        {/* Article Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
          className="space-y-6"
          style={{ fontSize: `${fontSize}px`, lineHeight }}
        >
          {article.paragraphs.map((para) => (
            <p key={para.id} className={`text-justify ${textColor}`}>
              {para.text.split(/(\s+)/).map((word, idx) => {
                const cleanWord = word.replace(/[.,!?;:'"]/g, "").toLowerCase();
                const vocab = article.vocabulary_highlighted.find(
                  (v) => v.word.toLowerCase() === cleanWord
                );

                if (vocab && word.trim()) {
                  return (
                    <span
                      key={`${para.id}-${idx}`}
                      onClick={() => handleWordClick(vocab)}
                      className="cursor-pointer rounded bg-teal/15 px-0.5 font-medium text-teal hover:bg-teal/25"
                    >
                      {word}
                    </span>
                  );
                }
                return <span key={`${para.id}-${idx}`}>{word}</span>;
              })}
            </p>
          ))}
        </motion.div>

        {/* Finish Reading Button */}
        <div className="mt-12 flex justify-center">
          <Button
            onClick={() => setShowQuiz(true)}
            size="lg"
            className="bg-teal text-teal-foreground hover:bg-teal/90"
          >
            <Check className="mr-2 h-4 w-4" />
            Hoàn thành và làm bài kiểm tra
          </Button>
        </div>
      </div>

      {/* Vocabulary Popover */}
      {selectedWord && (
        <VocabularyPopover
          word={selectedWord}
          onClose={() => setSelectedWord(null)}
        />
      )}
    </div>
  );
}

function ReadingSettings({
  fontSize,
  onFontSizeChange,
  lineHeight,
  onLineHeightChange,
}: {
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  lineHeight: number;
  onLineHeightChange: (height: number) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-lg font-semibold">Cài đặt đọc</h3>
        <p className="text-sm text-muted-foreground">Tùy chỉnh trải nghiệm đọc của bạn.</p>
      </div>

      <div className="space-y-4">
        {/* Font Size */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Type className="h-4 w-4" />
            Cỡ chữ: {fontSize}px
          </label>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onFontSizeChange(Math.max(14, fontSize - 2))}
              variant="outline"
              size="sm"
            >
              A-
            </Button>
            <Button
              onClick={() => onFontSizeChange(Math.min(28, fontSize + 2))}
              variant="outline"
              size="sm"
            >
              A+
            </Button>
          </div>
        </div>

        {/* Line Height */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            Khoảng cách dòng: {lineHeight.toFixed(1)}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[1.5, 1.8, 2.2].map((height) => (
              <Button
                key={height}
                onClick={() => onLineHeightChange(height)}
                variant={lineHeight === height ? "default" : "outline"}
                size="sm"
              >
                {height.toFixed(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
