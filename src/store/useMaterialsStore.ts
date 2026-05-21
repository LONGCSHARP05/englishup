import { create } from "zustand";
import { mockMaterials, type Material, type MaterialType, type ProcessingStage } from "@/mock";

export type NewMaterialInput = {
  title: string;
  type: MaterialType;
  sourceMeta?: string;
  fileSize?: number;
};

type MaterialsState = {
  materials: Material[];
  add: (input: NewMaterialInput) => string;
  update: (id: string, patch: Partial<Material>) => void;
  remove: (id: string) => void;
  retry: (id: string) => void;
  hasDuplicate: (title: string) => boolean;
};

const seed: Material[] = mockMaterials.map((m) =>
  m.status === "ready"
    ? { ...m, stage: "ready", progress: 100, generatedFlashcards: Math.round((m.wordCount ?? 1000) / 35) }
    : m,
);

export const useMaterialsStore = create<MaterialsState>((set, get) => ({
  materials: seed,
  hasDuplicate: (title) =>
    get().materials.some((m) => m.title.trim().toLowerCase() === title.trim().toLowerCase()),
  add: (input) => {
    const id = `m_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const material: Material = {
      id,
      title: input.title,
      type: input.type,
      status: "uploading",
      stage: "uploading",
      progress: 0,
      createdAt: new Date().toISOString(),
      sourceMeta: input.sourceMeta,
      fileSize: input.fileSize,
    };
    set((s) => ({ materials: [material, ...s.materials] }));
    return id;
  },
  update: (id, patch) =>
    set((s) => ({
      materials: s.materials.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    })),
  remove: (id) =>
    set((s) => ({ materials: s.materials.filter((m) => m.id !== id) })),
  retry: (id) => {
    set((s) => ({
      materials: s.materials.map((m) =>
        m.id === id
          ? { ...m, status: "uploading", stage: "uploading", progress: 0, errorMessage: undefined }
          : m,
      ),
    }));
  },
}));

export const STAGE_LABEL: Record<ProcessingStage, string> = {
  uploading: "Đang tải lên",
  extracting: "Trích xuất nội dung",
  analyzing: "AI phân tích",
  generating: "Tạo flashcard",
  ready: "Hoàn tất",
  failed: "Thất bại",
};

export const STAGE_ORDER: ProcessingStage[] = [
  "uploading",
  "extracting",
  "analyzing",
  "generating",
  "ready",
];