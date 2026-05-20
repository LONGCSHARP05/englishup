import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockUser } from "@/mock";

type Theme = "light" | "dark";

type AppState = {
  user: typeof mockUser;
  theme: Theme;
  toggleTheme: () => void;
  setRubyBalance: (n: number) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: mockUser,
      theme: "light",
      toggleTheme: () => set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
      setRubyBalance: (n) => set((s) => ({ user: { ...s.user, rubyBalance: n } })),
    }),
    { name: "englishup-app" }
  )
);