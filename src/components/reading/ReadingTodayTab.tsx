import { useState } from "react";
import { Play, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockReadingArticles } from "@/mock";
import { AiReader } from "./AiReader";
import { useReadingStore } from "@/store/useReadingStore";

export function ReadingTodayTab() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { startSession } = useReadingStore();

  const selectedArticle = mockReadingArticles.find((a) => a.id === selectedArticleId);

  const handleStartReading = (articleId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      startSession(articleId);
      setSelectedArticleId(articleId);
      setIsLoading(false);
    }, 600);
  };

  if (selectedArticle) {
    return <AiReader article={selectedArticle} onBack={() => setSelectedArticleId(null)} />;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card/50 p-4">
        <p className="text-sm text-muted-foreground">
          Đọc các bài phù hợp với trình độ của bạn. Nhấp vào từ vựng để tra cứu nghĩa và lưu lại.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {mockReadingArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            isLoading={isLoading}
            onStart={() => handleStartReading(article.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ArticleCard({
  article,
  isLoading,
  onStart,
}: {
  article: (typeof mockReadingArticles)[0];
  isLoading: boolean;
  onStart: () => void;
}) {
  const levelColor = {
    A1: "bg-teal/15 text-teal",
    A2: "bg-indigo/15 text-indigo",
    B1: "bg-amber/20 text-amber",
    B2: "bg-coral/15 text-coral",
    C1: "bg-coral/15 text-coral",
    C2: "bg-coral/15 text-coral",
  }[article.level];

  const diffColor =
    article.difficulty <= 2
      ? "bg-teal/15 text-teal"
      : article.difficulty <= 3
        ? "bg-amber/15 text-amber"
        : "bg-coral/15 text-coral";

  const progress = 0;

  return (
    <div className="card-lift overflow-hidden rounded-xl border border-border bg-card shadow-card">
      {/* Thumbnail */}
      <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${levelColor}`}>
            {article.level}
          </span>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="min-w-0">
          <h3 className="font-display text-sm font-semibold leading-snug line-clamp-2">
            {article.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{article.category}</p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${diffColor}`}>
            Độ khó {article.difficulty}/5
          </span>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
            {article.estimated_minutes} phút
          </span>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
            {article.word_count} từ
          </span>
        </div>

        {/* Progress */}
        {progress > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-muted-foreground">Tiến độ</span>
              <span className="font-semibold">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}

        <Button
          onClick={onStart}
          disabled={isLoading}
          size="sm"
          className="w-full bg-teal text-teal-foreground hover:bg-teal/90"
        >
          {isLoading ? (
            <>
              <Loader className="mr-1.5 h-4 w-4 animate-spin" />
              Đang tải...
            </>
          ) : progress > 0 ? (
            <>
              <Play className="mr-1.5 h-4 w-4" />
              Tiếp tục
            </>
          ) : (
            <>
              <Play className="mr-1.5 h-4 w-4" />
              Bắt đầu đọc
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
