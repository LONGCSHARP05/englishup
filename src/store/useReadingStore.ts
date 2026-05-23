import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockReadingSessions, type ReadingSession } from "@/mock";

type ReadingState = {
  sessions: ReadingSession[];
  current_session: ReadingSession | null;

  startSession: (article_id: string) => ReadingSession;
  endSession: (session_id: string, quiz_score: number, quiz_total: number, vocabulary_learned: number) => void;
  updateReadingTime: (session_id: string, seconds: number) => void;
  getSessionHistory: () => ReadingSession[];
  getCurrentSession: () => ReadingSession | null;
};

export const useReadingStore = create<ReadingState>()(
  persist(
    (set, get) => ({
      sessions: mockReadingSessions,
      current_session: null,

      startSession: (article_id) => {
        const newSession: ReadingSession = {
          id: `rs_${Date.now()}`,
          article_id,
          started_at: Date.now(),
          reading_time_seconds: 0,
          vocabulary_learned: 0,
          status: "in_progress",
        };
        set((s) => ({
          current_session: newSession,
          sessions: [newSession, ...s.sessions],
        }));
        return newSession;
      },

      endSession: (session_id, quiz_score, quiz_total, vocabulary_learned) => {
        set((s) => ({
          sessions: s.sessions.map((sess) =>
            sess.id === session_id
              ? {
                  ...sess,
                  completed_at: Date.now(),
                  quiz_score,
                  quiz_total,
                  vocabulary_learned,
                  status: "completed" as const,
                }
              : sess
          ),
          current_session: null,
        }));
      },

      updateReadingTime: (session_id, seconds) => {
        set((s) => ({
          sessions: s.sessions.map((sess) =>
            sess.id === session_id
              ? { ...sess, reading_time_seconds: seconds }
              : sess
          ),
        }));
      },

      getSessionHistory: () => {
        const { sessions } = get();
        return sessions.filter((s) => s.status === "completed").slice(0, 20);
      },

      getCurrentSession: () => {
        return get().current_session;
      },
    }),
    { name: "englishup-reading" }
  )
);
