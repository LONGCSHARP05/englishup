import { useState } from "react";
import { learningPathFilters, mockVocabPacks } from "@/mock";
import { VocabPackCard } from "@/components/cards/VocabPackCard";

export function LearningPath() {
  const [active, setActive] = useState<string>("Tất cả");
  return (
    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold">Lộ trình học</h2>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {learningPathFilters.map((f) => {
          const isActive = f === active;
          return (
            <button key={f} onClick={() => setActive(f)} className={`btn-press shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${isActive ? "border-teal bg-teal text-teal-foreground" : "border-border bg-card text-foreground hover:bg-accent"}`}>
              {f}
            </button>
          );
        })}
      </div>
      <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {mockVocabPacks.slice(0, 5).map((p) => (
          <div key={p.id} className="w-[220px] shrink-0"><VocabPackCard pack={p} /></div>
        ))}
      </div>
    </section>
  );
}
