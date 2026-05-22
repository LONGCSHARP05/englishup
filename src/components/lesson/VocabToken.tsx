import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus } from "lucide-react";
import type { LessonWord } from "@/mock/lessons";

export function VocabToken({
  word,
  info,
  onOpen,
  onSave,
}: {
  word: string;
  info: LessonWord;
  onOpen: () => void;
  onSave: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip open={open} onOpenChange={setOpen} delayDuration={120}>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onOpen}
          className="rounded-md bg-teal/10 px-1 py-0.5 font-medium text-teal underline decoration-teal/40 decoration-dotted underline-offset-2 transition-colors hover:bg-teal/20"
        >
          {word}
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-[240px] bg-popover p-3 text-popover-foreground shadow-card-hover"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="font-display text-sm font-semibold">{info.word}</span>
          <span className="text-[10px] text-muted-foreground">Lv {info.difficulty}</span>
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">{info.ipa}</div>
        <div className="mt-1 text-xs">{info.vietnameseMeaning}</div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSave();
            setOpen(false);
          }}
          className="mt-2 inline-flex items-center gap-1 rounded-full bg-teal px-2 py-1 text-[11px] font-medium text-teal-foreground hover:brightness-110"
        >
          <Plus className="h-3 w-3" /> Lưu từ
        </button>
      </TooltipContent>
    </Tooltip>
  );
}