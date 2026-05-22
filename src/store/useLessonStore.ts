import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Highlight = {
  id: string;
  lessonId: string;
  text: string;
  sectionId?: string;
  createdAt: number;
};

export type LessonNote = {
  id: string;
  lessonId: string;
  text: string;
  anchor?: string;
  createdAt: number;
};

export type LessonProgress = {
  percent: number;
  completed: boolean;
  bookmarked: boolean;
  studySeconds: number;
  savedWordIds: string[]; // word keys
  lastSavedAt?: number;
};

type State = {
  progress: Record<string, LessonProgress>;
  highlights: Highlight[];
  notes: LessonNote[];
  setPercent: (lessonId: string, percent: number) => void;
  toggleBookmark: (lessonId: string) => void;
  toggleComplete: (lessonId: string) => void;
  addStudyTime: (lessonId: string, seconds: number) => void;
  saveWord: (lessonId: string, wordKey: string) => void;
  addHighlight: (h: Omit<Highlight, "id" | "createdAt">) => void;
  removeHighlight: (id: string) => void;
  addNote: (n: Omit<LessonNote, "id" | "createdAt">) => void;
  removeNote: (id: string) => void;
};

const blank: LessonProgress = {
  percent: 0,
  completed: false,
  bookmarked: false,
  studySeconds: 0,
  savedWordIds: [],
};

export const useLessonStore = create<State>()(
  persist(
    (set, get) => ({
      progress: {},
      highlights: [],
      notes: [],
      setPercent: (lessonId, percent) =>
        set((s) => {
          const cur = s.progress[lessonId] ?? blank;
          const next = Math.max(cur.percent, Math.min(100, Math.round(percent)));
          if (next === cur.percent) return {};
          return {
            progress: {
              ...s.progress,
              [lessonId]: { ...cur, percent: next, lastSavedAt: Date.now() },
            },
          };
        }),
      toggleBookmark: (lessonId) =>
        set((s) => {
          const cur = s.progress[lessonId] ?? blank;
          return { progress: { ...s.progress, [lessonId]: { ...cur, bookmarked: !cur.bookmarked } } };
        }),
      toggleComplete: (lessonId) =>
        set((s) => {
          const cur = s.progress[lessonId] ?? blank;
          return {
            progress: {
              ...s.progress,
              [lessonId]: { ...cur, completed: !cur.completed, percent: !cur.completed ? 100 : cur.percent },
            },
          };
        }),
      addStudyTime: (lessonId, seconds) =>
        set((s) => {
          const cur = s.progress[lessonId] ?? blank;
          return {
            progress: { ...s.progress, [lessonId]: { ...cur, studySeconds: cur.studySeconds + seconds } },
          };
        }),
      saveWord: (lessonId, key) =>
        set((s) => {
          const cur = s.progress[lessonId] ?? blank;
          if (cur.savedWordIds.includes(key)) return {};
          return {
            progress: {
              ...s.progress,
              [lessonId]: { ...cur, savedWordIds: [...cur.savedWordIds, key] },
            },
          };
        }),
      addHighlight: (h) =>
        set((s) => ({
          highlights: [
            ...s.highlights,
            { ...h, id: `h_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, createdAt: Date.now() },
          ],
        })),
      removeHighlight: (id) =>
        set((s) => ({ highlights: s.highlights.filter((h) => h.id !== id) })),
      addNote: (n) =>
        set((s) => ({
          notes: [
            ...s.notes,
            { ...n, id: `n_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, createdAt: Date.now() },
          ],
        })),
      removeNote: (id) => set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),
    }),
    { name: "englishup-lesson" },
  ),
);

export function getProgress(state: State, lessonId: string): LessonProgress {
  return state.progress[lessonId] ?? blank;
}