import { Link, useLocation } from "@tanstack/react-router";
import { Home, BookOpen, Layers, Headphones, Library } from "lucide-react";

const items = [
  { to: "/", label: "Tổng quan", icon: Home },
  { to: "/library", label: "Thư viện", icon: BookOpen },
  { to: "/vocabulary", label: "Từ vựng", icon: Layers },
  { to: "/listening", label: "Nghe", icon: Headphones },
  { to: "/books", label: "Sách", icon: Library },
] as const;

export function MobileBottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card md:hidden">
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium transition-colors ${
                  active ? "text-teal" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}