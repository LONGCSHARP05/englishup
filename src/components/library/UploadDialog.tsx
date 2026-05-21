import { useCallback, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  FileText,
  Youtube,
  Globe,
  AlignLeft,
  UploadCloud,
  X,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  validatePdf,
  validateYoutube,
  validateUrl,
  validatePaste,
  formatBytes,
  deriveYoutubeTitle,
  deriveUrlTitle,
  runPipeline,
  MAX_FILE_BYTES,
} from "@/lib/uploadPipeline";
import { useMaterialsStore } from "@/store/useMaterialsStore";
import type { MaterialType } from "@/mock";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export function UploadDialog({ open, onOpenChange }: Props) {
  const [tab, setTab] = useState<MaterialType>("pdf");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl gap-0 p-0">
        <DialogHeader className="border-b border-border px-5 py-4">
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <Sparkles className="h-5 w-5 text-teal" />
            Tạo bài học mới với AI
          </DialogTitle>
          <DialogDescription>
            Tải tài liệu lên — AI sẽ tự động tạo flashcard và bài học cho bạn.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as MaterialType)} className="p-5">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pdf" className="gap-1.5">
              <FileText className="h-4 w-4" /> PDF
            </TabsTrigger>
            <TabsTrigger value="youtube" className="gap-1.5">
              <Youtube className="h-4 w-4" /> YouTube
            </TabsTrigger>
            <TabsTrigger value="article" className="gap-1.5">
              <Globe className="h-4 w-4" /> Bài viết
            </TabsTrigger>
            <TabsTrigger value="paste" className="gap-1.5">
              <AlignLeft className="h-4 w-4" /> Dán
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pdf" className="mt-4">
            <PdfTab onDone={() => onOpenChange(false)} />
          </TabsContent>
          <TabsContent value="youtube" className="mt-4">
            <SimpleTextTab
              type="youtube"
              label="Liên kết YouTube"
              placeholder="https://www.youtube.com/watch?v=..."
              validate={validateYoutube}
              titleFrom={deriveYoutubeTitle}
              onDone={() => onOpenChange(false)}
            />
          </TabsContent>
          <TabsContent value="article" className="mt-4">
            <SimpleTextTab
              type="article"
              label="Đường dẫn bài viết"
              placeholder="https://example.com/bai-viet"
              validate={validateUrl}
              titleFrom={deriveUrlTitle}
              onDone={() => onOpenChange(false)}
            />
          </TabsContent>
          <TabsContent value="paste" className="mt-4">
            <PasteTab onDone={() => onOpenChange(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function ErrorLine({ msg }: { msg: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-destructive">
      <AlertTriangle className="h-3.5 w-3.5" />
      {msg}
    </div>
  );
}

function PdfTab({ onDone }: { onDone: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { add, hasDuplicate } = useMaterialsStore();

  const handleFile = useCallback((f: File) => {
    const res = validatePdf(f);
    if (!res.ok) {
      setError(res.reason);
      setFile(null);
      return;
    }
    setError(null);
    setFile(f);
  }, []);

  const submit = () => {
    if (!file) {
      setError("Vui lòng chọn một tệp PDF.");
      return;
    }
    const title = file.name.replace(/\.pdf$/i, "");
    if (hasDuplicate(title)) {
      setError("Tài liệu trùng tên đã tồn tại trong thư viện.");
      return;
    }
    const id = add({ title, type: "pdf", fileSize: file.size });
    toast.success("Đã thêm tài liệu. AI đang xử lý...");
    onDone();
    void runPipeline(id);
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files?.[0];
          if (f) handleFile(f);
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
          dragging
            ? "border-teal bg-teal/5"
            : "border-border bg-secondary/40 hover:border-teal/60 hover:bg-teal/5"
        }`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/15 text-teal">
          <UploadCloud className="h-6 w-6" />
        </div>
        <div className="font-medium">Kéo & thả tệp PDF vào đây</div>
        <div className="text-xs text-muted-foreground">
          hoặc nhấp để chọn tệp · tối đa {formatBytes(MAX_FILE_BYTES)}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }}
        />
      </div>

      {file && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo/15 text-indigo">
              <FileText className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{file.name}</div>
              <div className="text-xs text-muted-foreground">{formatBytes(file.size)}</div>
            </div>
          </div>
          <button
            onClick={() => setFile(null)}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Bỏ chọn tệp"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {error && <ErrorLine msg={error} />}

      <div className="flex justify-end pt-1">
        <Button onClick={submit} disabled={!file} className="bg-teal text-teal-foreground hover:bg-teal/90">
          Bắt đầu xử lý
        </Button>
      </div>
    </div>
  );
}

function SimpleTextTab({
  type,
  label,
  placeholder,
  validate,
  titleFrom,
  onDone,
}: {
  type: MaterialType;
  label: string;
  placeholder: string;
  validate: (v: string) => { ok: true } | { ok: false; reason: string };
  titleFrom: (v: string) => string;
  onDone: () => void;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { add, hasDuplicate } = useMaterialsStore();

  const submit = () => {
    const res = validate(value);
    if (!res.ok) {
      setError(res.reason);
      return;
    }
    const title = titleFrom(value);
    if (hasDuplicate(title)) {
      setError("Tài liệu này đã có trong thư viện.");
      return;
    }
    const id = add({ title, type, sourceMeta: value.trim() });
    toast.success("Đã thêm. AI đang xử lý...");
    onDone();
    void runPipeline(id);
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor={`url-${type}`}>{label}</Label>
        <Input
          id={`url-${type}`}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(null);
          }}
          placeholder={placeholder}
          autoComplete="off"
        />
      </div>
      {error && <ErrorLine msg={error} />}
      <div className="flex justify-end pt-1">
        <Button onClick={submit} className="bg-teal text-teal-foreground hover:bg-teal/90">
          Bắt đầu xử lý
        </Button>
      </div>
    </div>
  );
}

function PasteTab({ onDone }: { onDone: () => void }) {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { add, hasDuplicate } = useMaterialsStore();

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const submit = () => {
    const res = validatePaste(text);
    if (!res.ok) {
      setError(res.reason);
      return;
    }
    const finalTitle =
      title.trim() || `Văn bản đã dán — ${new Date().toLocaleDateString("vi-VN")}`;
    if (hasDuplicate(finalTitle)) {
      setError("Đã có tài liệu trùng tên trong thư viện.");
      return;
    }
    const id = add({ title: finalTitle, type: "paste" });
    toast.success("Đã thêm. AI đang xử lý...");
    onDone();
    void runPipeline(id);
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor="paste-title">Tiêu đề (không bắt buộc)</Label>
        <Input
          id="paste-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
          placeholder="VD: Bài đọc IELTS Cambridge 17"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="paste-text">Nội dung văn bản</Label>
        <Textarea
          id="paste-text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError(null);
          }}
          rows={8}
          maxLength={50000}
          placeholder="Dán đoạn văn bản tiếng Anh bạn muốn học vào đây..."
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Tối thiểu 20 từ · tối đa 50.000 ký tự</span>
          <span className="font-mono">{wordCount} từ · {text.length} ký tự</span>
        </div>
      </div>
      {error && <ErrorLine msg={error} />}
      <div className="flex justify-end pt-1">
        <Button onClick={submit} className="bg-teal text-teal-foreground hover:bg-teal/90">
          Bắt đầu xử lý
        </Button>
      </div>
    </div>
  );
}