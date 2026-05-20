import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Quản trị — EnglishUp" },
      { name: "description", content: "Bảng điều khiển dành cho quản trị viên." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  return <PlaceholderPage title="Quản trị" description="Bảng điều khiển dành cho quản trị viên." />;
}
