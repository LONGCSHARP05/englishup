import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Cửa hàng Ruby — EnglishUp" },
      { name: "description", content: "Nạp Ruby để mở khoá nội dung cao cấp." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return <PlaceholderPage title="Cửa hàng Ruby" description="Nạp Ruby để mở khoá nội dung cao cấp." />;
}
