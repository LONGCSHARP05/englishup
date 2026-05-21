import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { StreakCard } from "./StreakCard";
import { useAppStore } from "@/store/useAppStore";

function computeGreeting(h: number) {
  if (h < 11) return "Chào buổi sáng";
  if (h < 14) return "Chào buổi trưa";
  if (h < 18) return "Chào buổi chiều";
  return "Chào buổi tối";
}

export function Hero({ dueCount }: { dueCount: number }) {
  const { user } = useAppStore();
  const firstName = user.name.split(" ").slice(-1)[0];
  const [hello, setHello] = useState("Xin chào");
  useEffect(() => {
    setHello(computeGreeting(new Date().getHours()));
  }, []);
  return (
    <section className="grid gap-6 md:grid-cols-5">
      <div className="space-y-4 md:col-span-3">
        <h1 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
          {hello}, {firstName} <span aria-hidden>👋</span>
        </h1>
        <p className="max-w-md text-base text-muted-foreground">
          Hôm nay ôn <span className="font-semibold text-foreground">{dueCount} thẻ từ</span> và nghe 1 bài mới nhé.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/vocabulary" className="btn-press inline-flex h-11 items-center rounded-lg bg-teal px-5 text-sm font-semibold text-teal-foreground shadow-card">
            Ôn tập ngay
          </Link>
          <Link to="/progress" className="btn-press inline-flex h-11 items-center rounded-lg border border-border bg-card px-5 text-sm font-semibold text-foreground">
            Xem tiến độ
          </Link>
        </div>
      </div>
      <div className="md:col-span-2">
        <StreakCard current={user.streakCurrent} completedDays={5} />
      </div>
    </section>
  );
}
