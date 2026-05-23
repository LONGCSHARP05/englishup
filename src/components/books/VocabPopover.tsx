import { Volume2, Bookmark, Layers } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import type { BookVocabWord } from "@/mock/books";

type Props = {
  word: BookVocabWord;
  children: React.ReactNode;
  onSave: () => void;
  onCreateFlashcard: () => void;
};

export function VocabPopover({ word, children, onSave, onCreateFlashcard }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-72" align="center">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="font-display text-base font-semibold">{word.word}</div>
              <div className="font-mono text-xs text-muted-foreground">{word.ipa}</div>
            </div>
            <button
              className="rounded-md p-1 text-muted-foreground hover:bg-accent"
              aria-label="Phát âm"
              type="button"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </div>
          <div className="text-sm font-medium text-foreground">{word.vietnameseMeaning}</div>
          <div className="text-xs text-muted-foreground">{word.englishDefinition}</div>
          <div className="rounded-md bg-secondary px-2 py-1.5 text-xs italic text-foreground/80">
            “{word.exampleSentence}”
          </div>
          <div className="flex gap-2 pt-1">
            <Button size="sm" className="flex-1 btn-press" onClick={onSave}>
              <Bookmark className="h-3.5 w-3.5" />
              Lưu vào từ vựng
            </Button>
            <Button size="sm" variant="outline" className="btn-press" onClick={onCreateFlashcard}>
              <Layers className="h-3.5 w-3.5" />
              Flashcard
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}