import { useState } from "react";
import { Play, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockListeningMaterials } from "@/mock";
import { DictationMode } from "./DictationMode";
import { useListeningStore } from "@/store/useListeningStore";

export function DictationTab() {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { startSession } = useListeningStore();

  const selectedMaterial = mockListeningMaterials.find((m) => m.id === selectedMaterialId);

  const handleStartLesson = (materialId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      startSession(materialId);
      setSelectedMaterialId(materialId);
      setIsLoading(false);
    }, 600);
  };

  if (selectedMaterial) {
    return <DictationMode material={selectedMaterial} onBack={() => setSelectedMaterialId(null)} />;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card/50 p-4">
        <p className="text-sm text-muted-foreground">
          Nghe đoạn hội thoại và gõ lại từng câu. AI sẽ kiểm tra độ chính xác và giúp bạn cải thiện phát âm.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {mockListeningMaterials.filter((m) => m.type === "dictation").map((material) => (
          <MaterialCard
            key={material.id}
            material={material}
            isLoading={isLoading}
            onStart={() => handleStartLesson(material.id)}
          />
        ))}
      </div>
    </div>
  );
}

function MaterialCard({
  material,
  isLoading,
  onStart,
}: {
  material: (typeof mockListeningMaterials)[0];
  isLoading: boolean;
  onStart: () => void;
}) {
  const levelColor = {
    A1: "bg-teal/15 text-teal",
    A2: "bg-indigo/15 text-indigo",
    B1: "bg-amber/20 text-amber",
    B2: "bg-coral/15 text-coral",
    C1: "bg-coral/15 text-coral",
    C2: "bg-coral/15 text-coral",
  }[material.level];

  const diffColor =
    material.difficulty <= 2
      ? "bg-teal/15 text-teal"
      : material.difficulty <= 3
        ? "bg-amber/15 text-amber"
        : "bg-coral/15 text-coral";

  return (
    <div className="card-lift overflow-hidden rounded-xl border border-border bg-card shadow-card">
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-sm font-semibold leading-snug line-clamp-2">
              {material.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">{material.topic}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${levelColor}`}>
            {material.level}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${diffColor}`}>
            Độ khó {material.difficulty}/5
          </span>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
            {material.duration_minutes} phút
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>{material.sentences.length} câu</span>
        </div>

        <Button
          onClick={onStart}
          disabled={isLoading}
          className="w-full bg-teal text-teal-foreground hover:bg-teal/90"
          size="sm"
        >
          {isLoading ? (
            <>
              <Loader className="mr-1.5 h-4 w-4 animate-spin" />
              Đang tải...
            </>
          ) : (
            <>
              <Play className="mr-1.5 h-4 w-4" />
              Bắt đầu
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
