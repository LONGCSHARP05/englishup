import { Link } from "@tanstack/react-router";
import {
  FileText,
  Youtube,
  Globe,
  AlignLeft,
  Loader2,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Trash2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Material } from "@/mock";
import { Progress } from "@/components/ui/progress";
import { STAGE_LABEL, STAGE_ORDER, useMaterialsStore } from "@/store/useMaterialsStore";
import { runPipeline } from "@/lib/uploadPipeline";
import { toast } from "sonner";

const typeMap: Record<Material["type"], { icon: LucideIcon; label: string; cls: string }> = {
  pdf: { icon: FileText, label: "PDF", cls: "bg-indigo/15 text-indigo" },
  youtube: { icon: Youtube, label: "YouTube", cls: "bg-coral/15 text-coral" },
  article: { icon: Globe, label: "Bài viết", cls: "bg-teal/15 text-teal" },
  paste: { icon: AlignLeft, label: "Văn bản", cls: "bg-muted text-muted-foreground" },
};

export function MaterialCard({ material }: { material: Material }) {
  const t = typeMap[material.type];
  const Icon = t.icon;
  const { remove, retry } = useMaterialsStore();

  const isProcessing =
    material.status === "uploading" || material.status === "processing";
  const isReady = material.status === "ready";
  const isFailed = material.status === "failed";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="card-lift relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-card"
    >
      <div className="flex items-start gap-3">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${t.cls}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.cls}`}>
              {t.label}
            </span>
            {isReady && material.generatedFlashcards != null && (
              <span className="inline-flex items-center gap-1 rounded-full bg-teal/15 px-2 py-0.5 text-[10px] font-semibold text-teal">
                <Sparkles className="h-3 w-3" /> {material.generatedFlashcards} thẻ
              </span>
            )}
          </div>
          <h3 className="mt-1.5 line-clamp-2 font-medium leading-snug" title={material.title}>
            {material.title}
          </h3>
          {material.wordCount && (
            <div className="mt-0.5 text-xs text-muted-foreground">
              ~{material.wordCount.toLocaleString("vi-VN")} từ
            </div>
          )}
        </div>
        {(isReady || isFailed) && (
          <button
            onClick={() => {
              remove(material.id);
              toast.success("Đã xóa tài liệu.");
            }}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
            aria-label="Xóa tài liệu"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {isProcessing && <ProcessingBlock material={material} />}

      {isFailed && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <div className="text-xs text-destructive">
              {material.errorMessage ?? "Đã xảy ra lỗi trong quá trình xử lý."}
            </div>
          </div>
          <button
            onClick={() => {
              retry(material.id);
              void runPipeline(material.id);
              toast.info("Đang thử lại...");
            }}
            className="btn-press mt-2 inline-flex items-center gap-1 rounded-full bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground"
          >
            <RefreshCw className="h-3 w-3" /> Thử lại
          </button>
        </div>
      )}

      {isReady && (
        <Link
          to="/lesson/$lessonId"
          params={{ lessonId: material.id }}
          className="btn-press mt-1 inline-flex items-center justify-center gap-1.5 self-start rounded-full bg-teal px-3.5 py-1.5 text-xs font-semibold text-teal-foreground"
        >
          Học ngay <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </motion.article>
  );
}

function ProcessingBlock({ material }: { material: Material }) {
  const stage = material.stage ?? "uploading";
  const progress = material.progress ?? 0;
  const currentIndex = STAGE_ORDER.indexOf(stage);

  return (
    <div className="space-y-2.5 rounded-lg bg-secondary/60 p-3">
      <div className="flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-teal" />
          {STAGE_LABEL[stage]}…
        </span>
        <span className="font-mono text-muted-foreground">{progress}%</span>
      </div>
      <Progress value={progress} className="h-1.5" />
      <div className="flex items-center justify-between gap-1">
        {STAGE_ORDER.slice(0, 4).map((s, i) => {
          const done = i < currentIndex || stage === "ready";
          const active = i === currentIndex;
          return (
            <div key={s} className="flex flex-1 flex-col items-center gap-1">
              <span
                className={`h-1 w-full rounded-full transition-colors ${
                  done
                    ? "bg-teal"
                    : active
                      ? "bg-teal/60"
                      : "bg-border"
                }`}
              />
              <span
                className={`text-[9px] font-medium uppercase tracking-wide ${
                  active ? "text-teal" : "text-muted-foreground"
                }`}
              >
                {STAGE_LABEL[s]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}