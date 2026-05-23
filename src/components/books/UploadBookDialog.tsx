import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BookOpen, Lock, Gem, Sparkles, TriangleAlert as AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { mockBooks, bookLevels, bookCategories, type BookLevel, type BookCategory } from "@/mock/books";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onUpload: (book: {
    title: string;
    author: string;
    level: BookLevel;
    category: BookCategory;
    isPremium: boolean;
    rubyPrice: number;
  }) => void;
};

const COVER_GRADIENTS = [
  "linear-gradient(135deg, var(--amber), var(--coral))",
  "linear-gradient(135deg, var(--indigo), var(--teal))",
  "linear-gradient(135deg, var(--teal), var(--indigo))",
  "linear-gradient(135deg, var(--coral), var(--amber))",
  "linear-gradient(135deg, var(--indigo), var(--coral))",
  "linear-gradient(135deg, var(--amber), var(--teal))",
];

export function UploadBookDialog({ open, onOpenChange, onUpload }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("EnglishUp Editorial");
  const [level, setLevel] = useState<BookLevel>("B1");
  const [category, setCategory] = useState<BookCategory>("Truyện ngắn");
  const [isPremium, setIsPremium] = useState(false);
  const [rubyPrice, setRubyPrice] = useState(100);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Vui lòng nhập tên sách.");
      return;
    }
    if (mockBooks.some((b) => b.title.toLowerCase() === title.trim().toLowerCase())) {
      setError("Sách cùng tên đã tồn tại trong thư viện.");
      return;
    }
    setError(null);
    onUpload({
      title: title.trim(),
      author: author.trim() || "EnglishUp Editorial",
      level,
      category,
      isPremium,
      rubyPrice: isPremium ? rubyPrice : 0,
    });
    setTitle("");
    setAuthor("EnglishUp Editorial");
    setLevel("B1");
    setCategory("Truyện ngắn");
    setIsPremium(false);
    setRubyPrice(100);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-24px)] max-w-[540px] gap-0 overflow-hidden p-0 sm:w-full">
        <DialogHeader className="border-b border-border px-5 py-4 pr-12">
          <DialogTitle className="flex items-center gap-2 font-display text-lg sm:text-xl">
            <BookOpen className="h-5 w-5 text-teal" />
            Thêm sách mới
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Sách sẽ được xử lý và thêm vào thư viện sách.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 p-5">
          {/* Helper Text */}
          <div className="rounded-lg border border-amber/30 bg-amber/5 p-3 text-xs text-muted-foreground">
            <div className="flex gap-2">
              <Sparkles className="h-4 w-4 shrink-0 text-amber" />
              <div>
                <span className="font-medium text-amber">Lưu ý:</span>{" "}
                Thư viện tài liệu dùng để tạo flashcard, bài đọc và dictation.
                Thư viện sách dùng cho PDF/sách dài có trải nghiệm lật trang, bookmark và highlight.
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="book-title">Tên sách *</Label>
            <Input
              id="book-title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError(null);
              }}
              placeholder="VD: Daily English Stories"
              maxLength={100}
            />
          </div>

          {/* Author */}
          <div className="space-y-1.5">
            <Label htmlFor="book-author">Tác giả</Label>
            <Input
              id="book-author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="EnglishUp Editorial"
              maxLength={80}
            />
          </div>

          {/* Level & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Trình độ</Label>
              <Select value={level} onValueChange={(v) => setLevel(v as BookLevel)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bookLevels.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Thể loại</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as BookCategory)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bookCategories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Premium Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-amber" />
              <div>
                <div className="text-sm font-medium">Sách trả phí</div>
                <div className="text-xs text-muted-foreground">
                  Người dùng cần Ruby để mở khóa
                </div>
              </div>
            </div>
            <Switch checked={isPremium} onCheckedChange={setIsPremium} />
          </div>

          {/* Ruby Price */}
          {isPremium && (
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5">
                <Gem className="h-3.5 w-3.5 text-amber" />
                Giá Ruby
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {[100, 150, 200].map((p) => (
                  <button
                    key={p}
                    onClick={() => setRubyPrice(p)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      rubyPrice === p
                        ? "border-teal bg-teal/10 text-teal"
                        : "border-border bg-card hover:border-teal/50"
                    }`}
                  >
                    {p} Ruby
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-1.5 text-xs text-destructive">
              <AlertTriangle className="h-3.5 w-3.5" />
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-teal text-teal-foreground hover:bg-teal/90"
            >
              <BookOpen className="mr-1.5 h-4 w-4" />
              Thêm sách
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
