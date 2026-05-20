import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Thư viện — EnglishUp" },
      { name: "description", content: "Quản lý tài liệu và bộ từ vựng của bạn." },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  return <PlaceholderPage title="Thư viện" description="Quản lý tài liệu và bộ từ vựng của bạn." />;
}
