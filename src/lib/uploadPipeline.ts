import { useMaterialsStore } from "@/store/useMaterialsStore";
import type { ProcessingStage } from "@/mock";

type Step = { stage: ProcessingStage; from: number; to: number; duration: number };

const STEPS: Step[] = [
  { stage: "uploading", from: 0, to: 25, duration: 1200 },
  { stage: "extracting", from: 25, to: 55, duration: 1500 },
  { stage: "analyzing", from: 55, to: 80, duration: 1800 },
  { stage: "generating", from: 80, to: 100, duration: 2000 },
];

/**
 * Simulate the AI processing pipeline for a material.
 * Animates progress through each stage; on completion, marks ready and attaches mock flashcards.
 * `failChance` lets callers preview the error path (default 0).
 */
export async function runPipeline(
  id: string,
  opts: { failChance?: number; failStage?: ProcessingStage } = {},
) {
  const { update } = useMaterialsStore.getState();
  const failChance = opts.failChance ?? 0;

  for (const step of STEPS) {
    update(id, { stage: step.stage, status: "processing", progress: step.from });
    const ticks = 20;
    const tickMs = step.duration / ticks;
    for (let i = 1; i <= ticks; i++) {
      await sleep(tickMs);
      const p = step.from + ((step.to - step.from) * i) / ticks;
      update(id, { progress: Math.round(p) });
    }

    const shouldFail =
      (opts.failStage && opts.failStage === step.stage) ||
      (Math.random() < failChance);
    if (shouldFail) {
      update(id, {
        status: "failed",
        stage: "failed",
        errorMessage: failMessageFor(step.stage),
      });
      return { ok: false as const };
    }
  }

  const wordCount = 800 + Math.floor(Math.random() * 4200);
  const generated = Math.max(12, Math.round(wordCount / 35));
  update(id, {
    status: "ready",
    stage: "ready",
    progress: 100,
    wordCount,
    generatedFlashcards: generated,
  });
  return { ok: true as const, generated };
}

function failMessageFor(stage: ProcessingStage): string {
  switch (stage) {
    case "uploading":
      return "Không thể tải tệp lên. Vui lòng thử lại.";
    case "extracting":
      return "Không thể trích xuất nội dung. Tệp có thể bị hỏng hoặc bảo vệ bằng mật khẩu.";
    case "analyzing":
      return "AI không thể phân tích nội dung này.";
    case "generating":
      return "Tạo flashcard thất bại. Vui lòng thử lại.";
    default:
      return "Đã xảy ra lỗi không xác định.";
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/* Validation helpers */

export const MAX_FILE_BYTES = 20 * 1024 * 1024; // 20MB
export const ACCEPTED_PDF = ["application/pdf"];
export const ACCEPTED_EXT = [".pdf"];

export function validatePdf(file: File): { ok: true } | { ok: false; reason: string } {
  const isPdf =
    ACCEPTED_PDF.includes(file.type) ||
    ACCEPTED_EXT.some((ext) => file.name.toLowerCase().endsWith(ext));
  if (!isPdf) return { ok: false, reason: "Chỉ chấp nhận tệp PDF." };
  if (file.size === 0) return { ok: false, reason: "Tệp trống, không thể xử lý." };
  if (file.size > MAX_FILE_BYTES)
    return { ok: false, reason: `Tệp vượt quá 20MB (hiện ${formatBytes(file.size)}).` };
  return { ok: true };
}

const YT_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{6,}/i;
export function validateYoutube(url: string) {
  if (!url.trim()) return { ok: false as const, reason: "Vui lòng nhập liên kết YouTube." };
  if (!YT_REGEX.test(url.trim()))
    return { ok: false as const, reason: "Liên kết YouTube không hợp lệ." };
  return { ok: true as const };
}

export function validateUrl(url: string) {
  if (!url.trim()) return { ok: false as const, reason: "Vui lòng nhập đường dẫn bài viết." };
  try {
    const u = new URL(url.trim());
    if (!/^https?:$/.test(u.protocol))
      return { ok: false as const, reason: "Đường dẫn phải bắt đầu bằng http hoặc https." };
    return { ok: true as const };
  } catch {
    return { ok: false as const, reason: "Đường dẫn không hợp lệ." };
  }
}

export function validatePaste(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return { ok: false as const, reason: "Vui lòng dán nội dung văn bản." };
  const wordCount = trimmed.split(/\s+/).length;
  if (wordCount < 20)
    return { ok: false as const, reason: "Cần ít nhất 20 từ để tạo bài học." };
  if (trimmed.length > 50000)
    return { ok: false as const, reason: "Văn bản quá dài (tối đa 50.000 ký tự)." };
  return { ok: true as const };
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function deriveYoutubeTitle(url: string) {
  return `YouTube — ${url.replace(/^https?:\/\//, "").slice(0, 60)}`;
}

export function deriveUrlTitle(url: string) {
  try {
    const u = new URL(url);
    return `${u.hostname.replace(/^www\./, "")} — ${u.pathname.slice(1, 40) || "bài viết"}`;
  } catch {
    return url.slice(0, 60);
  }
}