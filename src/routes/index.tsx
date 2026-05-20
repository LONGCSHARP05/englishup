import { createFileRoute } from "@tanstack/react-router";
import { Gem, Flame, Brain, Clock } from "lucide-react";
import { Hero } from "@/components/dashboard/Hero";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickAccess } from "@/components/dashboard/QuickAccess";
import { LearningPath } from "@/components/dashboard/LearningPath";
import { ReviewQueue } from "@/components/dashboard/ReviewQueue";
import { RecentMaterials } from "@/components/dashboard/RecentMaterials";
import { useAppStore } from "@/store/useAppStore";
import { mockVocabulary } from "@/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tổng quan — EnglishUp" },
      { name: "description", content: "Theo dõi tiến độ, ôn từ vựng và khám phá lộ trình học tiếng Anh hôm nay." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAppStore();
  const dueCount = mockVocabulary.filter((v) => v.status === "review" || v.status === "learning").length;
  const learnedCount = mockVocabulary.filter((v) => v.status !== "new").length + 228;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-6 md:px-6 md:py-8">
      <Hero dueCount={dueCount} />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <StatCard icon={Gem} value={String(user.rubyBalance)} label="Ruby" tone="amber" to="/shop" />
        <StatCard icon={Flame} value={`${user.streakCurrent} ngày`} label="Chuỗi học" tone="amber" />
        <StatCard icon={Brain} value={String(learnedCount)} label="Từ đã học" tone="teal" />
        <StatCard icon={Clock} value={String(dueCount)} label="Cần ôn hôm nay" tone="coral" to="/vocabulary" />
      </div>

      <QuickAccess />
      <LearningPath />
      <ReviewQueue />
      <RecentMaterials />
    </div>
  );
}
