import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Tiến độ — EnglishUp" },
      { name: "description", content: "Thống kê chi tiết về quá trình học của bạn." },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  return <PlaceholderPage title="Tiến độ" description="Thống kê chi tiết về quá trình học của bạn." />;
}
