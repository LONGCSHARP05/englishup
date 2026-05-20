import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

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
  return <PlaceholderPage title="Luyện đọc" description="Đọc hiểu với phụ đề và ghi chú thông minh." />;
}
