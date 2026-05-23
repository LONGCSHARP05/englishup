import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockListeningSessions, type ListeningSession } from "@/mock";

type DictationAnswer = {
  sentence_id: string;
  user_text: string;
  correct_text: string;
  accuracy: number;
  mistakes: string[];
};

type ListeningState = {
  sessions: ListeningSession[];
  current_session: ListeningSession | null;
  dictation_answers: DictationAnswer[];

  startSession: (material_id: string) => ListeningSession;
  endSession: (session_id: string, accuracy: number, correct_count: number) => void;
  recordAnswer: (answer: DictationAnswer) => void;
  getSessionHistory: () => ListeningSession[];
  getCurrentSession: () => ListeningSession | null;
};

export const useListeningStore = create<ListeningState>()(
  persist(
    (set, get) => ({
      sessions: mockListeningSessions,
      current_session: null,
      dictation_answers: [],

      startSession: (material_id) => {
        const newSession: ListeningSession = {
          id: `ls_${Date.now()}`,
          material_id,
          started_at: Date.now(),
          overall_accuracy: 0,
          total_sentences: 0,
          correct_sentences: 0,
          status: "in_progress",
        };
        set((s) => ({
          current_session: newSession,
          sessions: [newSession, ...s.sessions],
        }));
        return newSession;
      },

      endSession: (session_id, accuracy, correct_count) => {
        set((s) => ({
          sessions: s.sessions.map((sess) =>
            sess.id === session_id
              ? {
                  ...sess,
                  completed_at: Date.now(),
                  overall_accuracy: Math.round(accuracy),
                  correct_sentences: correct_count,
                  status: "completed" as const,
                }
              : sess
          ),
          current_session: null,
        }));
      },

      recordAnswer: (answer) => {
        set((s) => ({
          dictation_answers: [...s.dictation_answers, answer],
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
    { name: "englishup-listening" }
  )
);
