import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/listening")({
  head: () => ({
    meta: [
      { title: "Luyện nghe — EnglishUp" },
      { name: "description", content: "Cải thiện kỹ năng nghe với các bài luyện đa dạng." },
    ],
  }),
  component: ListeningPage,
});

function ListeningPage() {
  return <PlaceholderPage title="Luyện nghe" description="Cải thiện kỹ năng nghe với các bài luyện đa dạng." />;
}
