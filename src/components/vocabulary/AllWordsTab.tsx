import { useMemo, useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useVocabStore } from "@/store/useVocabStore";
import { statusBadge } from "./StatusLegend";
import { AddWordSheet } from "./AddWordSheet";
import { toast } from "sonner";

type StatusFilter = "all" | "new" | "learning" | "review" | "mastered";
type DiffFilter = "all" | "1" | "2" | "3" | "4" | "5";
type SortKey = "recent" | "alpha" | "difficulty";

export function AllWordsTab() {
  const { vocab, deleteWord } = useVocabStore();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [diff, setDiff] = useState<DiffFilter>("all");
  const [sort, setSort] = useState<SortKey>("recent");
  const [openAdd, setOpenAdd] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const rows = useMemo(() => {
    let list = vocab.filter((v) => {
      if (q && !`${v.word} ${v.vietnameseMeaning}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (status !== "all" && v.status !== status) return false;
      if (diff !== "all" && String(v.difficulty) !== diff) return false;
      return true;
    });
    if (sort === "alpha") list = [...list].sort((a, b) => a.word.localeCompare(b.word));
    else if (sort === "difficulty") list = [...list].sort((a, b) => b.difficulty - a.difficulty);
    else list = [...list].sort((a, b) => new Date(b.nextReviewDate).getTime() - new Date(a.nextReviewDate).getTime());
    return list;
  }, [vocab, q, status, diff, sort]);

  const target = vocab.find((v) => v.id === deletingId);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1 min-w-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm theo từ hoặc nghĩa..."
            className="pl-9"
          />
        </div>
        <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-none">
          <Select value={status} onValueChange={(v) => setStatus(v as StatusFilter)}>
            <SelectTrigger className="min-w-0"><SelectValue placeholder="Trạng thái" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="new">Mới</SelectItem>
              <SelectItem value="learning">Đang học</SelectItem>
              <SelectItem value="review">Cần ôn</SelectItem>
              <SelectItem value="mastered">Thành thạo</SelectItem>
            </SelectContent>
          </Select>
          <Select value={diff} onValueChange={(v) => setDiff(v as DiffFilter)}>
            <SelectTrigger className="min-w-0"><SelectValue placeholder="Độ khó" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Mọi độ khó</SelectItem>
              {[1, 2, 3, 4, 5].map((n) => (
                <SelectItem key={n} value={String(n)}>Độ khó {n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="min-w-0"><SelectValue placeholder="Sắp xếp" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Mới cập nhật</SelectItem>
              <SelectItem value="alpha">A → Z</SelectItem>
              <SelectItem value="difficulty">Độ khó giảm dần</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setOpenAdd(true)} className="sm:shrink-0">
          <Plus className="mr-1 h-4 w-4" /> Thêm từ
        </Button>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
          Không có từ nào phù hợp bộ lọc.
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-xl border border-border bg-card shadow-card md:block">
            <div className="grid grid-cols-[1.6fr_1.4fr_1.2fr_1fr_0.8fr] gap-3 border-b border-border bg-muted/40 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <div>Từ</div>
              <div>Nghĩa</div>
              <div>Trạng thái</div>
              <div>Ôn kế tiếp</div>
              <div className="text-right">Thao tác</div>
            </div>
            <ul>
              {rows.map((v) => {
                const b = statusBadge[v.status];
                return (
                  <li
                    key={v.id}
                    className="grid grid-cols-[1.6fr_1.4fr_1.2fr_1fr_0.8fr] items-center gap-3 border-b border-border/60 px-4 py-3 last:border-b-0 hover:bg-muted/30"
                  >
                    <div className="min-w-0">
                      <div className="truncate font-display font-semibold">{v.word}</div>
                      <div className="truncate font-mono text-xs text-muted-foreground">{v.ipa}</div>
                    </div>
                    <div className="truncate text-sm text-foreground/80">{v.vietnameseMeaning}</div>
                    <div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${b.cls}`}>
                        {b.label}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(v.nextReviewDate).toLocaleDateString("vi-VN")}
                    </div>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => toast.info("Sắp ra mắt")} aria-label="Sửa">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeletingId(v.id)} aria-label="Xoá" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Mobile cards */}
          <ul className="space-y-2 md:hidden">
            {rows.map((v) => {
              const b = statusBadge[v.status];
              return (
                <li key={v.id} className="rounded-xl border border-border bg-card p-3 shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate font-display font-semibold">{v.word}</div>
                      <div className="truncate font-mono text-xs text-muted-foreground">{v.ipa}</div>
                      <div className="mt-1 line-clamp-2 text-sm text-foreground/80">{v.vietnameseMeaning}</div>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${b.cls}`}>
                      {b.label}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Ôn kế tiếp: {new Date(v.nextReviewDate).toLocaleDateString("vi-VN")}</span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.info("Sắp ra mắt")} aria-label="Sửa">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeletingId(v.id)} aria-label="Xoá">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}

      <AddWordSheet open={openAdd} onOpenChange={setOpenAdd} />

      <AlertDialog open={!!deletingId} onOpenChange={(o) => !o && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xoá từ này?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn sắp xoá <strong>{target?.word}</strong>. Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingId) {
                  deleteWord(deletingId);
                  toast.success("Đã xoá từ");
                  setDeletingId(null);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Xoá
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}