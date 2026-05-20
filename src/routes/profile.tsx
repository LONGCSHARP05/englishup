import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Hồ sơ — EnglishUp" },
      { name: "description", content: "Cập nhật thông tin và mục tiêu học tập của bạn." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return <PlaceholderPage title="Hồ sơ" description="Cập nhật thông tin và mục tiêu học tập của bạn." />;
}
