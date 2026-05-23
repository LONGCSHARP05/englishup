import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Headphones, Zap, BookOpen, ChartBar as BarChart3 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ListeningDashboard } from "@/components/listening/ListeningDashboard";
import { DictationTab } from "@/components/listening/DictationTab";
import { ShadowingTab } from "@/components/listening/ShadowingTab";
import { ListeningPacksGrid } from "@/components/listening/ListeningPacksGrid";
import { ListeningProgressTab } from "@/components/listening/ListeningProgressTab";

export const Route = createFileRoute("/listening")({
  head: () => ({
    meta: [
      { title: "Luyện nghe — EnglishUp" },
      { name: "description", content: "Cải thiện kỹ năng nghe với dictation, shadowing, và bài luyện tương tác." },
    ],
  }),
  component: ListeningPage,
});

function ListeningPage() {
  const [tab, setTab] = useState("dashboard");

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 px-3 py-5 sm:px-5 sm:py-6">
      <ListeningDashboard />

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <div className="-mx-3 overflow-x-auto px-3 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <TabsList className="inline-flex h-auto w-auto min-w-full gap-0.5 rounded-full border border-border bg-muted/50 p-1 sm:w-auto sm:min-w-0">
            <TabsTrigger
              value="dashboard"
              data-tab-trigger="dashboard"
              className="gap-1.5 rounded-full px-4 py-2 data-[state=active]:bg-teal data-[state=active]:text-teal-foreground"
            >
              <Headphones className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Luyện nghe</span>
            </TabsTrigger>
            <TabsTrigger
              value="dictation"
              data-tab-trigger="dictation"
              className="gap-1.5 rounded-full px-4 py-2 data-[state=active]:bg-teal data-[state=active]:text-teal-foreground"
            >
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Dictation</span>
            </TabsTrigger>
            <TabsTrigger
              value="shadowing"
              data-tab-trigger="shadowing"
              className="gap-1.5 rounded-full px-4 py-2 data-[state=active]:bg-teal data-[state=active]:text-teal-foreground"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Shadowing</span>
            </TabsTrigger>
            <TabsTrigger
              value="packs"
              data-tab-trigger="packs"
              className="gap-1.5 rounded-full px-4 py-2 data-[state=active]:bg-teal data-[state=active]:text-teal-foreground"
            >
              <Headphones className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Bộ nghe</span>
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

        <TabsContent value="dashboard" className="mt-6">
          <DictationTab />
        </TabsContent>

        <TabsContent value="dictation" className="mt-6">
          <DictationTab />
        </TabsContent>

        <TabsContent value="shadowing" className="mt-6">
          <ShadowingTab />
        </TabsContent>

        <TabsContent value="packs" className="mt-6">
          <ListeningPacksGrid />
        </TabsContent>

        <TabsContent value="progress" className="mt-6">
          <ListeningProgressTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
