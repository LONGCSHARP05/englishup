import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

type Tone = "teal" | "indigo" | "amber" | "coral";

const toneClasses: Record<Tone, string> = {
  teal: "bg-teal/15 text-teal",
  indigo: "bg-indigo/15 text-indigo",
  amber: "bg-amber/20 text-amber",
  coral: "bg-coral/15 text-coral",
};

export function StatCard({
  icon: Icon, value, label, tone, to,
}: { icon: LucideIcon; value: string; label: string; tone: Tone; to?: string }) {
  const inner = (
    <div className="card-lift flex h-full items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${toneClasses[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="font-display text-2xl font-semibold leading-tight">{value}</div>
        <div className="truncate text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
  return to ? <Link to={to} className="block h-full">{inner}</Link> : inner;
}
