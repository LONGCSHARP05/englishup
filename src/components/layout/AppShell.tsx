import { useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Gem } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { useAppStore } from "@/store/useAppStore";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { theme, user } = useAppStore();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      {/* Mobile floating Ruby balance */}
      <Link
        to="/shop"
        className="fixed right-4 top-4 z-50 flex items-center gap-1.5 rounded-full bg-amber px-3 py-1.5 text-sm font-semibold text-amber-foreground shadow-card btn-press md:hidden"
        aria-label="Số dư Ruby"
      >
        <Gem className="h-4 w-4" />
        <span className="font-mono">{user.rubyBalance}</span>
      </Link>

      <main className="pb-20 md:ml-[72px] md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <MobileBottomNav />
    </div>
  );
}