import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatsBar } from "@/components/vocabulary/StatsBar";
import { ReviewTab } from "@/components/vocabulary/ReviewTab";
import { AllWordsTab } from "@/components/vocabulary/AllWordsTab";
import { PacksTab } from "@/components/vocabulary/PacksTab";
import { StatsTab } from "@/components/vocabulary/StatsTab";
import { useVocabStore, getDueWords } from "@/store/useVocabStore";
import { toast } from "sonner";

export const Route = createFileRoute("/vocabulary")({
  head: () => ({
    meta: [
      { title: "Từ vựng — EnglishUp" },
      { name: "description", content: "Ôn tập flashcard với hệ thống SRS thông minh." },
    ],
  }),
  component: VocabularyPage,
});

function VocabularyPage() {
  const { vocab } = useVocabStore();
  const [tab, setTab] = useState("review");
  const [packFilterIds, setPackFilterIds] = useState<Set<string> | null>(null);

  const stats = useMemo(() => {
    const due = getDueWords(vocab).length;
    const learnedTotal = vocab.filter((v) => v.status !== "new").length;
    return { due, learnedTotal, accuracy: 89 };
  }, [vocab]);

  const packFilter = packFilterIds
    ? (id: string) => packFilterIds.has(id)
    : undefined;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5 px-3 py-5 sm:px-5 sm:py-6">
      <header className="space-y-1">
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">Từ vựng</h1>
        <p className="text-sm text-muted-foreground">
          Ôn tập thông minh với hệ thống SRS — học ít, nhớ lâu.
        </p>
      </header>

      <StatsBar
        dueToday={stats.due}
        learnedTotal={stats.learnedTotal}
        weeklyAccuracy={stats.accuracy}
      />

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <div className="-mx-3 overflow-x-auto px-3 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <TabsList className="inline-flex h-auto w-auto min-w-full gap-1 bg-muted p-1 sm:w-auto sm:min-w-0">
            <TabsTrigger value="review" className="px-3 py-1.5">Ôn tập</TabsTrigger>
            <TabsTrigger value="all" className="px-3 py-1.5">Tất cả từ</TabsTrigger>
            <TabsTrigger value="packs" className="px-3 py-1.5">Bộ từ</TabsTrigger>
            <TabsTrigger value="stats" className="px-3 py-1.5">Thống kê</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="review" className="mt-5">
          {packFilterIds && (
            <div className="mb-3 flex items-center justify-between rounded-lg bg-indigo/10 px-3 py-2 text-sm">
              <span className="text-indigo">
                Đang ôn theo bộ từ ({packFilterIds.size} thẻ)
              </span>
              <button
                onClick={() => setPackFilterIds(null)}
                className="font-medium text-indigo hover:underline"
              >
                Xoá bộ lọc
              </button>
            </div>
          )}
          <ReviewTab packFilter={packFilter} />
        </TabsContent>

        <TabsContent value="all" className="mt-5">
          <AllWordsTab />
        </TabsContent>

        <TabsContent value="packs" className="mt-5">
          <PacksTab
            onReviewPack={(packId) => {
              // Mock: take a random subset of vocab as pack contents
              const ids = new Set(
                vocab
                  .slice()
                  .sort(() => Math.random() - 0.5)
                  .slice(0, 10)
                  .map((v) => v.id),
              );
              setPackFilterIds(ids);
              setTab("review");
              toast.success(`Bắt đầu ôn tập bộ từ`);
            }}
          />
        </TabsContent>

        <TabsContent value="stats" className="mt-5">
          <StatsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
