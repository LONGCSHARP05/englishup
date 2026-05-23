import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Bookmark = {
  id: string;
  bookId: string;
  pageNumber: number;
  excerpt: string;
  color: string;
  createdAt: string;
};

export type Highlight = {
  id: string;
  bookId: string;
  pageNumber: number;
  selectedText: string;
  color: string;
  note?: string;
  createdAt: string;
};

export type ReadingSettingsState = {
  fontSize: "sm" | "md" | "lg";
  theme: "light" | "sepia" | "dark";
  layout: "single" | "spread";
};

type BooksState = {
  unlockedBookIds: string[];
  currentPage: Record<string, number>; // bookId -> 1-based page
  bookmarks: Bookmark[];
  highlights: Highlight[];
  savedWords: { bookId: string; word: string }[];
  settings: ReadingSettingsState;
  unlock: (bookId: string) => void;
  setCurrentPage: (bookId: string, page: number) => void;
  addBookmark: (b: Omit<Bookmark, "id" | "createdAt">) => void;
  removeBookmark: (id: string) => void;
  addHighlight: (h: Omit<Highlight, "id" | "createdAt">) => string;
  updateHighlightNote: (id: string, note: string) => void;
  removeHighlight: (id: string) => void;
  saveWord: (bookId: string, word: string) => void;
  setSettings: (s: Partial<ReadingSettingsState>) => void;
};

const uid = () => Math.random().toString(36).slice(2, 10);

export const useBooksStore = create<BooksState>()(
  persist(
    (set, get) => ({
      unlockedBookIds: ["bk-daily-stories", "bk-science-simple", "bk-short-stories-b1", "bk-adventure"],
      currentPage: {},
      bookmarks: [
        {
          id: "bm-seed-1",
          bookId: "bk-daily-stories",
          pageNumber: 3,
          excerpt: "Reading aloud helped her ears as much as her tongue...",
          color: "var(--amber)",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
      ],
      highlights: [],
      savedWords: [],
      settings: { fontSize: "md", theme: "sepia", layout: "spread" },
      unlock: (bookId) =>
        set((s) =>
          s.unlockedBookIds.includes(bookId)
            ? s
            : { unlockedBookIds: [...s.unlockedBookIds, bookId] },
        ),
      setCurrentPage: (bookId, page) =>
        set((s) => ({ currentPage: { ...s.currentPage, [bookId]: page } })),
      addBookmark: (b) =>
        set((s) => ({
          bookmarks: [
            { ...b, id: uid(), createdAt: new Date().toISOString() },
            ...s.bookmarks,
          ],
        })),
      removeBookmark: (id) =>
        set((s) => ({ bookmarks: s.bookmarks.filter((x) => x.id !== id) })),
      addHighlight: (h) => {
        const id = uid();
        set((s) => ({
          highlights: [
            { ...h, id, createdAt: new Date().toISOString() },
            ...s.highlights,
          ],
        }));
        return id;
      },
      updateHighlightNote: (id, note) =>
        set((s) => ({
          highlights: s.highlights.map((h) => (h.id === id ? { ...h, note } : h)),
        })),
      removeHighlight: (id) =>
        set((s) => ({ highlights: s.highlights.filter((x) => x.id !== id) })),
      saveWord: (bookId, word) => {
        const existing = get().savedWords.find(
          (w) => w.bookId === bookId && w.word === word,
        );
        if (existing) return;
        set((s) => ({ savedWords: [...s.savedWords, { bookId, word }] }));
      },
      setSettings: (s) =>
        set((state) => ({ settings: { ...state.settings, ...s } })),
    }),
    { name: "englishup-books" },
  ),
);