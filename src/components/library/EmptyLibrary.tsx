import { FileText, Youtube, Globe, AlignLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyLibrary({ onUpload }: { onUpload: () => void }) {
  const items = [
    { icon: FileText, label: "Tệp PDF", desc: "Sách, bài đọc, đề thi" },
    { icon: Youtube, label: "YouTube", desc: "Trích xuất phụ đề" },
    { icon: Globe, label: "Bài viết", desc: "Dán đường dẫn URL" },
    { icon: AlignLeft, label: "Văn bản", desc: "Dán nội dung trực tiếp" },
  ];
  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-border bg-card/60 p-10 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal/20 to-indigo/20 text-teal">
        <Sparkles className="h-7 w-7" />
      </div>
      <h2 className="font-display text-2xl font-semibold">Thư viện của bạn đang trống</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Thêm tài liệu — AI sẽ tự động trích xuất từ vựng và tạo bộ flashcard cho bạn.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="rounded-xl border border-border bg-background p-3 text-left">
            <it.icon className="h-5 w-5 text-teal" />
            <div className="mt-2 text-sm font-medium">{it.label}</div>
            <div className="text-xs text-muted-foreground">{it.desc}</div>
          </div>
        ))}
      </div>
      <Button
        onClick={onUpload}
        className="btn-press mt-6 bg-teal text-teal-foreground hover:bg-teal/90"
        size="lg"
      >
        Thêm tài liệu đầu tiên
      </Button>
    </div>
  );
}