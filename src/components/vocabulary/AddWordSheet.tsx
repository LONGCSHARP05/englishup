import { useState } from "react";
import { Image as ImageIcon, Youtube, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useVocabStore } from "@/store/useVocabStore";
import { toast } from "sonner";

type Props = { open: boolean; onOpenChange: (o: boolean) => void };

export function AddWordSheet({ open, onOpenChange }: Props) {
  const { addWord } = useVocabStore();
  const [word, setWord] = useState("");
  const [ipa, setIpa] = useState("");
  const [meaning, setMeaning] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [difficulty, setDifficulty] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [errors, setErrors] = useState<{ word?: string; meaning?: string; youtube?: string }>({});

  const reset = () => {
    setWord(""); setIpa(""); setMeaning(""); setDefinition("");
    setExample(""); setDifficulty(3); setImagePreview(null);
    setYoutubeUrl(""); setErrors({});
  };

  const onFile = (f: File | null) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      toast.error("Vui lòng chọn tệp ảnh hợp lệ");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  const onSubmit = () => {
    const errs: typeof errors = {};
    if (!word.trim()) errs.word = "Vui lòng nhập từ";
    if (!meaning.trim()) errs.meaning = "Vui lòng nhập nghĩa tiếng Việt";
    if (youtubeUrl && !/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(youtubeUrl)) {
      errs.youtube = "Link YouTube không hợp lệ";
    }
    setErrors(errs);
    if (Object.keys(errs).length) return;

    addWord({
      word: word.trim(),
      ipa: ipa.trim(),
      vietnameseMeaning: meaning.trim(),
      englishDefinition: definition.trim(),
      exampleSentence: example.trim(),
      collocations: [],
      difficulty,
    });
    toast.success("Đã thêm từ mới");
    reset();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={(o) => { if (!o) reset(); onOpenChange(o); }}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Thêm từ thủ công</SheetTitle>
          <SheetDescription>
            Bổ sung từ vựng vào kho cá nhân của bạn.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-5 space-y-4">
          <Field label="Từ" required error={errors.word}>
            <Input value={word} onChange={(e) => setWord(e.target.value)} placeholder="vd. eloquent" />
          </Field>
          <Field label="Phiên âm IPA">
            <Input value={ipa} onChange={(e) => setIpa(e.target.value)} placeholder="/ˈel.ə.kwənt/" className="font-mono" />
          </Field>
          <Field label="Nghĩa tiếng Việt" required error={errors.meaning}>
            <Input value={meaning} onChange={(e) => setMeaning(e.target.value)} placeholder="hùng biện, lưu loát" />
          </Field>
          <Field label="Định nghĩa tiếng Anh">
            <Textarea rows={2} value={definition} onChange={(e) => setDefinition(e.target.value)} placeholder="fluent or persuasive in speaking" className="resize-y" />
          </Field>
          <Field label="Ví dụ">
            <Textarea rows={2} value={example} onChange={(e) => setExample(e.target.value)} placeholder="She gave an eloquent speech." className="resize-y" />
          </Field>
          <Field label="Độ khó">
            <Select value={String(difficulty)} onValueChange={(v) => setDifficulty(Number(v) as 1 | 2 | 3 | 4 | 5)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((n) => (
                  <SelectItem key={n} value={String(n)}>{n} / 5</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Hình ảnh minh hoạ">
            {imagePreview ? (
              <div className="relative overflow-hidden rounded-lg border border-border">
                <img src={imagePreview} alt="preview" className="h-40 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="absolute right-2 top-2 rounded-full bg-background/80 p-1 hover:bg-background"
                  aria-label="Xoá ảnh"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 py-6 text-sm text-muted-foreground hover:border-teal/40 hover:text-teal">
                <ImageIcon className="h-4 w-4" />
                Chọn ảnh từ máy
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                />
              </label>
            )}
          </Field>

          <Field label="Link video YouTube" error={errors.youtube}>
            <div className="flex items-center gap-2">
              <Youtube className="h-4 w-4 shrink-0 text-coral" />
              <Input
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtu.be/..."
                className="min-w-0"
              />
            </div>
          </Field>
        </div>

        <SheetFooter className="mt-6 flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Huỷ
          </Button>
          <Button onClick={onSubmit} className="w-full sm:w-auto">
            Lưu từ mới
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">
        {label}
        {required && <span className="ml-0.5 text-coral">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}