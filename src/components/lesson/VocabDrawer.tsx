import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2, Plus, Sparkles, BookmarkPlus } from "lucide-react";
import type { LessonWord } from "@/mock/lessons";
import { toast } from "sonner";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export function VocabDrawer({
  word,
  open,
  onOpenChange,
  onSave,
}: {
  word: LessonWord | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSave: (w: LessonWord) => void;
}) {
  const [note, setNote] = useState("");

  if (!word) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-[calc(100vw-24px)] max-w-md flex-col gap-0 overflow-y-auto p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border bg-gradient-to-br from-teal/10 to-indigo/10 p-5 text-left">
          <div className="flex items-center gap-2">
            <Badge variant="outline">Lv {word.difficulty}</Badge>
            <button
              type="button"
              onClick={() => toast("🔊 Phát âm (mock)")}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-card text-teal hover:bg-teal hover:text-teal-foreground"
              aria-label="Phát âm"
            >
              <Volume2 className="h-3.5 w-3.5" />
            </button>
          </div>
          <SheetTitle className="font-display text-2xl">{word.word}</SheetTitle>
          <div className="font-mono text-sm text-muted-foreground">{word.ipa}</div>
          <div className="text-sm text-foreground">{word.vietnameseMeaning}</div>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <Tabs defaultValue="meaning" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="meaning">Nghĩa</TabsTrigger>
              <TabsTrigger value="examples">Ví dụ</TabsTrigger>
              <TabsTrigger value="notes">Ghi chú</TabsTrigger>
            </TabsList>

            <TabsContent value="meaning" className="mt-4 space-y-3">
              <div>
                <div className="text-xs font-semibold uppercase text-muted-foreground">Định nghĩa</div>
                <p className="mt-1 text-sm text-foreground">{word.englishDefinition}</p>
              </div>
              {word.synonyms.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase text-muted-foreground">Đồng nghĩa</div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {word.synonyms.map((s) => (
                      <Badge key={s} variant="secondary" className="rounded-full">{s}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {word.collocations.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase text-muted-foreground">Collocations</div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {word.collocations.map((c) => (
                      <Badge key={c} variant="outline" className="rounded-full">{c}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="examples" className="mt-4 space-y-3">
              <div className="rounded-xl border border-border bg-muted/30 p-3 text-sm italic">
                “{word.example}”
              </div>
              <p className="text-xs text-muted-foreground">
                Sẽ có thêm ví dụ thực tế khi backend trả về.
              </p>
            </TabsContent>

            <TabsContent value="notes" className="mt-4 space-y-2">
              <Textarea
                placeholder="Ghi chú cá nhân về từ này..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[120px] resize-y"
              />
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  toast.success("Đã lưu ghi chú");
                  setNote("");
                }}
              >
                <BookmarkPlus className="mr-1.5 h-4 w-4" /> Lưu ghi chú
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        <div className="sticky bottom-0 grid grid-cols-2 gap-2 border-t border-border bg-background p-4">
          <Button
            onClick={() => {
              onSave(word);
              toast.success(`Đã lưu “${word.word}” vào bộ từ`);
            }}
            className="btn-press"
          >
            <Plus className="mr-1.5 h-4 w-4" /> Lưu vào bộ từ
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.success("Đã tạo flashcard mới")}
            className="btn-press"
          >
            <Sparkles className="mr-1.5 h-4 w-4" /> Tạo flashcard
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}