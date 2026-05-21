import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockVocabulary, type VocabItem, type VocabStatus } from "@/mock";

export type Rating = "hard" | "learning" | "known";

type ReviewLogEntry = {
  id: string;
  word: string;
  rating: Rating;
  ts: number;
};

type VocabState = {
  vocab: VocabItem[];
  reviewLog: ReviewLogEntry[];
  addWord: (w: Omit<VocabItem, "id" | "status" | "nextReviewDate" | "easeFactor" | "reviewCount"> & Partial<Pick<VocabItem, "status">>) => void;
  updateWord: (id: string, patch: Partial<VocabItem>) => void;
  deleteWord: (id: string) => void;
  rateWord: (id: string, rating: Rating) => void;
};

const addDays = (n: number) =>
  new Date(Date.now() + n * 86400000).toISOString();

function applyRating(v: VocabItem, rating: Rating): VocabItem {
  let { easeFactor, reviewCount } = v;
  let status: VocabStatus = v.status;
  let nextDays = 1;
  if (rating === "hard") {
    easeFactor = Math.max(1.3, easeFactor - 0.2);
    status = "learning";
    nextDays = 1;
  } else if (rating === "learning") {
    easeFactor = Math.max(1.5, easeFactor - 0.05);
    status = "learning";
    nextDays = 2;
  } else {
    easeFactor = easeFactor + 0.1;
    reviewCount += 1;
    nextDays = Math.min(60, Math.round(Math.max(3, reviewCount * easeFactor)));
    status = reviewCount >= 5 ? "mastered" : "review";
  }
  return {
    ...v,
    easeFactor,
    reviewCount: rating === "known" ? reviewCount : v.reviewCount + 1,
    nextReviewDate: addDays(nextDays),
    status,
  };
}

export const useVocabStore = create<VocabState>()(
  persist(
    (set) => ({
      vocab: mockVocabulary,
      reviewLog: [],
      addWord: (w) =>
        set((s) => ({
          vocab: [
            {
              id: `v-${Date.now()}`,
              status: "new",
              nextReviewDate: addDays(0),
              easeFactor: 2.5,
              reviewCount: 0,
              ...w,
            } as VocabItem,
            ...s.vocab,
          ],
        })),
      updateWord: (id, patch) =>
        set((s) => ({
          vocab: s.vocab.map((v) => (v.id === id ? { ...v, ...patch } : v)),
        })),
      deleteWord: (id) =>
        set((s) => ({ vocab: s.vocab.filter((v) => v.id !== id) })),
      rateWord: (id, rating) =>
        set((s) => {
          const item = s.vocab.find((v) => v.id === id);
          if (!item) return s;
          const updated = applyRating(item, rating);
          return {
            vocab: s.vocab.map((v) => (v.id === id ? updated : v)),
            reviewLog: [
              { id: `r-${Date.now()}`, word: item.word, rating, ts: Date.now() },
              ...s.reviewLog,
            ].slice(0, 500),
          };
        }),
    }),
    { name: "englishup-vocab" },
  ),
);

export function getDueWords(items: VocabItem[]) {
  const now = Date.now();
  return items.filter(
    (v) =>
      (v.status === "review" || v.status === "learning" || v.status === "new") &&
      new Date(v.nextReviewDate).getTime() <= now + 86400000,
  );
}