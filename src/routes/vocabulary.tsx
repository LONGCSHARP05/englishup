import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

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
  return <PlaceholderPage title="Từ vựng" description="Ôn tập flashcard với hệ thống SRS thông minh." />;
}
