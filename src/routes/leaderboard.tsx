import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Xếp hạng — EnglishUp" },
      { name: "description", content: "So tài cùng cộng đồng học viên EnglishUp." },
    ],
  }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  return <PlaceholderPage title="Xếp hạng" description="So tài cùng cộng đồng học viên EnglishUp." />;
}
