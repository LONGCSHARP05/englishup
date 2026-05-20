import { Link, useLocation } from "@tanstack/react-router";
import { Home, BookOpen, Layers, Headphones, BookText, Library, Trophy, BarChart3, Shield, Sun, Moon, Gem, Sparkles } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const navItems = [
  { to: "/", label: "Tổng quan", icon: Home },
  { to: "/library", label: "Thư viện", icon: BookOpen },
  { to: "/vocabulary", label: "Từ vựng", icon: Layers },
  { to: "/listening", label: "Luyện nghe", icon: Headphones },
  { to: "/reading", label: "Luyện đọc", icon: BookText },
  { to: "/books", label: "Sách", icon: Library },
  { to: "/leaderboard", label: "Xếp hạng", icon: Trophy },
  { to: "/progress", label: "Tiến độ", icon: BarChart3 },
] as const;

export function Sidebar() {
  const { pathname } = useLocation();
  const { user, theme, toggleTheme } = useAppStore();

  return (
    <aside className="group fixed left-0 top-0 z-40 hidden h-screen w-[72px] flex-col border-r border-border bg-sidebar transition-[width] duration-200 ease-out hover:w-[220px] md:flex">
      <div className="flex h-16 items-center gap-2 px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal text-teal-foreground">
          <Sparkles className="h-5 w-5" />
        </div>
        <span className="font-display text-lg font-semibold opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          EnglishUp
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-3">
        {navItems.map((item) => {
          const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex h-11 items-center gap-3 overflow-hidden rounded-full px-3 text-sm font-medium transition-colors duration-150 ${
                active
                  ? "bg-teal text-teal-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-border p-3">
        <Link
          to="/shop"
          className="flex h-10 items-center gap-2 overflow-hidden rounded-full bg-amber/15 px-3 text-sm font-semibold text-amber transition-colors hover:bg-amber/25"
          aria-label="Số dư Ruby"
        >
          <Gem className="h-4 w-4 shrink-0" />
          <span className="font-mono">{user.rubyBalance}</span>
          <span className="ml-auto whitespace-nowrap text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Ruby
          </span>
        </Link>

        <Link to="/profile" className="flex items-center gap-3 overflow-hidden rounded-full px-2 py-1.5 hover:bg-sidebar-accent">
          <img src={user.avatar} alt={user.name} className="h-8 w-8 shrink-0 rounded-full bg-muted" />
          <div className="min-w-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="truncate text-sm font-medium">{user.name}</div>
            <div className="text-xs text-muted-foreground">Cấp {user.level}</div>
          </div>
        </Link>

        <button
          onClick={toggleTheme}
          className="flex h-9 w-full items-center gap-3 overflow-hidden rounded-full px-3 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
          aria-label="Đổi giao diện"
        >
          {theme === "light" ? <Moon className="h-4 w-4 shrink-0" /> : <Sun className="h-4 w-4 shrink-0" />}
          <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {theme === "light" ? "Chế độ tối" : "Chế độ sáng"}
          </span>
        </button>

        {(user.role === "admin" || user.role === "superadmin") && (
          <Link to="/admin" className="flex h-9 items-center gap-3 overflow-hidden rounded-full px-3 text-sm hover:bg-sidebar-accent">
            <Shield className="h-4 w-4 shrink-0" />
            <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">Quản trị</span>
          </Link>
        )}
      </div>
    </aside>
  );
}