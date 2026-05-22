import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Bookmark = {
  id: string;
  bookId: string;
  page: number;
  color: "red" | "blue" | "yellow" | "green";
  note?: string;
  createdAt: string;
};

export type Highlight = {
  id: string;
  bookId: string;
  page: number;
  text: string;
  color: "yellow" | "green" | "pink" | "blue";
  note?: string;
  createdAt: string;
};

type ReadingProgress = {
  currentPage: number;
  lastReadAt: string;
  percentComplete: number;
};

type BookState = {
  // Unlocked premium books
  unlockedBooks: string[];
  // Reading progress per book
  readingProgress: Record<string, ReadingProgress>;
  // Bookmarks
  bookmarks: Bookmark[];
  // Highlights
  highlights: Highlight[];

  // Actions
  unlockBook: (bookId: string) => void;
  isBookUnlocked: (bookId: string) => boolean;
  setCurrentPage: (bookId: string, page: number, totalPages: number) => void;
  getProgress: (bookId: string) => ReadingProgress | undefined;
  addBookmark: (bookId: string, page: number, color: Bookmark["color"], note?: string) => void;
  removeBookmark: (bookmarkId: string) => void;
  getBookmarks: (bookId: string) => Bookmark[];
  addHighlight: (bookId: string, page: number, text: string, color: Highlight["color"], note?: string) => void;
  removeHighlight: (highlightId: string) => void;
  getHighlights: (bookId: string) => Highlight[];
};

export const useBookStore = create<BookState>()(
  persist(
    (set, get) => ({
      unlockedBooks: [],
      readingProgress: {},
      bookmarks: [],
      highlights: [],

      unlockBook: (bookId) =>
        set((s) => ({
          unlockedBooks: s.unlockedBooks.includes(bookId)
            ? s.unlockedBooks
            : [...s.unlockedBooks, bookId],
        })),

      isBookUnlocked: (bookId) => get().unlockedBooks.includes(bookId),

      setCurrentPage: (bookId, page, totalPages) =>
        set((s) => ({
          readingProgress: {
            ...s.readingProgress,
            [bookId]: {
              currentPage: page,
              lastReadAt: new Date().toISOString(),
              percentComplete: Math.round((page / totalPages) * 100),
            },
          },
        })),

      getProgress: (bookId) => get().readingProgress[bookId],

      addBookmark: (bookId, page, color, note) =>
        set((s) => ({
          bookmarks: [
            ...s.bookmarks,
            {
              id: `bm-${Date.now()}`,
              bookId,
              page,
              color,
              note,
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      removeBookmark: (bookmarkId) =>
        set((s) => ({
          bookmarks: s.bookmarks.filter((b) => b.id !== bookmarkId),
        })),

      getBookmarks: (bookId) =>
        get().bookmarks.filter((b) => b.bookId === bookId),

      addHighlight: (bookId, page, text, color, note) =>
        set((s) => ({
          highlights: [
            ...s.highlights,
            {
              id: `hl-${Date.now()}`,
              bookId,
              page,
              text,
              color,
              note,
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      removeHighlight: (highlightId) =>
        set((s) => ({
          highlights: s.highlights.filter((h) => h.id !== highlightId),
        })),

      getHighlights: (bookId) =>
        get().highlights.filter((h) => h.bookId === bookId),
    }),
    { name: "englishup-books" }
  )
);
