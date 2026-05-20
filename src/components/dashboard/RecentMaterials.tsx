import { Link } from "@tanstack/react-router";
import { ArrowRight, FileText, Youtube, Globe, AlignLeft, Loader2, type LucideIcon } from "lucide-react";
import { mockMaterials, type Material } from "@/mock";

const typeMap: Record<Material["type"], { icon: LucideIcon; label: string; cls: string }> = {
  pdf: { icon: FileText, label: "PDF", cls: "bg-indigo/15 text-indigo" },
  youtube: { icon: Youtube, label: "YouTube", cls: "bg-coral/15 text-coral" },
  article: { icon: Globe, label: "Bài viết", cls: "bg-teal/15 text-teal" },
  paste: { icon: AlignLeft, label: "Văn bản", cls: "bg-muted text-muted-foreground" },
};

function StatusBadge({ status }: { status: Material["status"] }) {
  if (status === "ready") return <span className="rounded-full bg-teal/15 px-2 py-0.5 text-[10px] font-semibold text-teal">Sẵn sàng</span>;
  if (status === "failed") return <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-semibold text-destructive">Thất bại</span>;
  if (status === "processing") return <span className="inline-flex items-center gap-1 rounded-full bg-amber/20 px-2 py-0.5 text-[10px] font-semibold text-amber"><Loader2 className="h-3 w-3 animate-spin" /> Đang xử lý</span>;
  return <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"><Loader2 className="h-3 w-3 animate-spin" /> Đang tải lên</span>;
}

function relativeTime(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "Vừa xong";
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  return `${Math.floor(diff / 86400)} ngày trước`;
}

export function RecentMaterials() {
  const recent = [...mockMaterials].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 3);
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">Tài liệu gần đây</h2>
        <Link to="/library" className="inline-flex items-center gap-1 text-sm font-medium text-teal hover:underline">
          Xem tất cả <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {recent.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center">
          <div className="text-3xl">📚</div>
          <div className="mt-2 font-semibold">Chưa có tài liệu nào</div>
          <Link to="/library" className="btn-press mt-3 inline-flex rounded-full bg-teal px-4 py-2 text-sm font-medium text-teal-foreground">
            Thêm ngay
          </Link>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-3">
          {recent.map((m) => {
            const t = typeMap[m.type];
            const Icon = t.icon;
            return (
              <article key={m.id} className="card-lift flex flex-col rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="flex items-start gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${t.cls}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.cls}`}>{t.label}</span>
                      <StatusBadge status={m.status} />
                    </div>
                    <div className="mt-1.5 truncate font-medium" title={m.title}>{m.title}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {m.wordCount ? `~${m.wordCount.toLocaleString("vi-VN")} từ • ` : ""}
                      {relativeTime(m.createdAt)}
                    </div>
                  </div>
                </div>
                <Link to="/library" className="btn-press mt-3 inline-flex items-center justify-center gap-1 self-start rounded-full border border-teal/30 px-3 py-1.5 text-xs font-medium text-teal hover:bg-teal/10">
                  Tạo bài học <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
