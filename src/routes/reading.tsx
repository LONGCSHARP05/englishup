import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Sparkles, Library, ChartBar as BarChart3 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ReadingDashboard } from "@/components/reading/ReadingDashboard";
import { ReadingTodayTab } from "@/components/reading/ReadingTodayTab";
import { AiReaderTab } from "@/components/reading/AiReaderTab";
import { ReadingPacksGrid } from "@/components/reading/ReadingPacksGrid";
import { ReadingProgressTab } from "@/components/reading/ReadingProgressTab";

export const Route = createFileRoute("/reading")({
  head: () => ({
    meta: [
      { title: "Luyện đọc — EnglishUp" },
      { name: "description", content: "Đọc hiểu với phụ đề và ghi chú thông minh." },
    ],
  }),
  component: ReadingPage,
});

function ReadingPage() {
  const [tab, setTab] = useState("today");

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 px-3 py-5 sm:px-5 sm:py-6">
      <ReadingDashboard />

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <div className="-mx-3 overflow-x-auto px-3 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <TabsList className="inline-flex h-auto w-auto min-w-full gap-0.5 rounded-full border border-border bg-muted/50 p-1 sm:w-auto sm:min-w-0">
            <TabsTrigger
              value="today"
              data-tab-trigger="today"
              className="gap-1.5 rounded-full px-4 py-2 data-[state=active]:bg-teal data-[state=active]:text-teal-foreground"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Đọc hôm nay</span>
            </TabsTrigger>
            <TabsTrigger
              value="ai-reader"
              data-tab-trigger="ai-reader"
              className="gap-1.5 rounded-full px-4 py-2 data-[state=active]:bg-teal data-[state=active]:text-teal-foreground"
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">AI Reader</span>
            </TabsTrigger>
            <TabsTrigger
              value="packs"
              data-tab-trigger="packs"
              className="gap-1.5 rounded-full px-4 py-2 data-[state=active]:bg-teal data-[state=active]:text-teal-foreground"
            >
              <Library className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Bộ bài đọc</span>
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              data-tab-trigger="progress"
              className="gap-1.5 rounded-full px-4 py-2 data-[state=active]:bg-teal data-[state=active]:text-teal-foreground"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Tiến độ</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="today" className="mt-6">
          <ReadingTodayTab />
        </TabsContent>

        <TabsContent value="ai-reader" className="mt-6">
          <AiReaderTab />
        </TabsContent>

        <TabsContent value="packs" className="mt-6">
          <ReadingPacksGrid />
        </TabsContent>

        <TabsContent value="progress" className="mt-6">
          <ReadingProgressTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
