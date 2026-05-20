import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Sách — EnglishUp" },
      { name: "description", content: "Khám phá thư viện sách tiếng Anh phong phú." },
    ],
  }),
  component: BooksPage,
});

function BooksPage() {
  return <PlaceholderPage title="Sách" description="Khám phá thư viện sách tiếng Anh phong phú." />;
}
