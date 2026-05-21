import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Search, Filter, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { UploadDialog } from "@/components/library/UploadDialog";
import { MaterialCard } from "@/components/library/MaterialCard";
import { EmptyLibrary } from "@/components/library/EmptyLibrary";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMaterialsStore } from "@/store/useMaterialsStore";
import type { MaterialType } from "@/mock";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Thư viện — EnglishUp" },
      { name: "description", content: "Quản lý tài liệu và bộ từ vựng của bạn." },
    ],
  }),
  component: LibraryPage,
});

type TypeFilter = "all" | MaterialType;
type StatusFilter = "all" | "processing" | "ready" | "failed";

const TYPE_FILTERS: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "pdf", label: "PDF" },
  { value: "youtube", label: "YouTube" },
  { value: "article", label: "Bài viết" },
  { value: "paste", label: "Văn bản" },
];

function LibraryPage() {
  const { materials } = useMaterialsStore();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const counts = useMemo(
    () => ({
      total: materials.length,
      processing: materials.filter(
        (m) => m.status === "uploading" || m.status === "processing",
      ).length,
      ready: materials.filter((m) => m.status === "ready").length,
      failed: materials.filter((m) => m.status === "failed").length,
    }),
    [materials],
  );

  const filtered = useMemo(() => {
    return materials.filter((m) => {
      if (typeFilter !== "all" && m.type !== typeFilter) return false;
      if (statusFilter === "processing" && m.status !== "uploading" && m.status !== "processing")
        return false;
      if (statusFilter === "ready" && m.status !== "ready") return false;
      if (statusFilter === "failed" && m.status !== "failed") return false;
      if (query.trim() && !m.title.toLowerCase().includes(query.trim().toLowerCase()))
        return false;
      return true;
    });
  }, [materials, typeFilter, statusFilter, query]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 md:px-6 md:py-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold md:text-4xl">Thư viện</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tất cả tài liệu của bạn — AI tự động tạo flashcard và bài học.
          </p>
        </div>
        <Button
          onClick={() => setOpen(true)}
          size="lg"
          className="btn-press w-full bg-teal text-teal-foreground hover:bg-teal/90 md:w-auto"
        >
          <Plus className="mr-1.5 h-4 w-4" /> Thêm tài liệu
        </Button>
      </header>

      {materials.length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatPill label="Tổng" value={counts.total} tone="default" />
          <StatPill label="Đang xử lý" value={counts.processing} tone="amber" icon={Loader2} spin />
          <StatPill label="Sẵn sàng" value={counts.ready} tone="teal" icon={CheckCircle2} />
          <StatPill label="Thất bại" value={counts.failed} tone="destructive" icon={AlertTriangle} />
        </div>
      )}

      {materials.length === 0 ? (
        <EmptyLibrary onUpload={() => setOpen(true)} />
      ) : (
        <>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm tài liệu..."
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <Filter className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
              {TYPE_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setTypeFilter(f.value)}
                  className={`btn-press rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    typeFilter === f.value
                      ? "bg-teal text-teal-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/60 p-10 text-center">
              <div className="text-3xl">🔍</div>
              <div className="mt-2 font-medium">Không tìm thấy tài liệu phù hợp</div>
              <button
                onClick={() => {
                  setQuery("");
                  setTypeFilter("all");
                  setStatusFilter("all");
                }}
                className="mt-3 text-sm font-medium text-teal hover:underline"
              >
                Xóa bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((m) => (
                  <MaterialCard key={m.id} material={m} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </>
      )}

      <UploadDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}

function StatPill({
  label,
  value,
  tone,
  icon: Icon,
  spin,
}: {
  label: string;
  value: number;
  tone: "default" | "teal" | "amber" | "destructive";
  icon?: React.ComponentType<{ className?: string }>;
  spin?: boolean;
}) {
  const toneCls = {
    default: "bg-card text-foreground border-border",
    teal: "bg-teal/10 text-teal border-teal/20",
    amber: "bg-amber/10 text-amber border-amber/20",
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
  }[tone];
  return (
    <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${toneCls}`}>
      {Icon && <Icon className={`h-5 w-5 ${spin ? "animate-spin" : ""}`} />}
      <div>
        <div className="font-mono text-xl font-semibold">{value}</div>
        <div className="text-xs opacity-80">{label}</div>
      </div>
    </div>
  );
}
