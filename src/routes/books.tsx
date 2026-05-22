import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Book, Gem, Search, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
import { mockBooks, type Book as BookType } from "@/mock";
import { useBookStore } from "@/store/useBookStore";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "sonner";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Thu vien Sach — EnglishUp" },
      { name: "description", content: "Kham pha thu vien sach tieng Anh phong phu." },
    ],
  }),
  component: BooksPage,
});

type FilterType = "all" | "free" | "premium";
type LevelFilter = "all" | "A2" | "B1" | "B2" | "C1";

function BooksPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");
  const [unlockDialog, setUnlockDialog] = useState<BookType | null>(null);

  const { user, setRubyBalance } = useAppStore();
  const { unlockBook, getProgress, isBookUnlocked } = useBookStore();

  const filteredBooks = mockBooks.filter((book) => {
    if (searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (typeFilter === "free" && book.isPremium) return false;
    if (typeFilter === "premium" && !book.isPremium) return false;
    if (levelFilter !== "all" && book.level !== levelFilter) return false;
    return true;
  });

  function handleUnlock(book: BookType) {
    if (!book.isPremium) {
      navigate({ to: "/books/$bookId", params: { bookId: book.id } });
      return;
    }

    if (isBookUnlocked(book.id)) {
      navigate({ to: "/books/$bookId", params: { bookId: book.id } });
      return;
    }

    // Check balance
    if (user.rubyBalance < book.rubyPrice) {
      toast.error("Khong du Ruby. Nap them?", {
        action: {
          label: "Den cua hang",
          onClick: () => navigate({ to: "/shop" }),
        },
      });
      return;
    }

    setUnlockDialog(book);
  }

  function confirmUnlock() {
    if (!unlockDialog) return;

    setRubyBalance(user.rubyBalance - unlockDialog.rubyPrice);
    unlockBook(unlockDialog.id);
    toast.success(`Da mo khoa! Chuc ban doc vui.`);
    setUnlockDialog(null);
    navigate({ to: "/books/$bookId", params: { bookId: unlockDialog.id } });
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
      {/* Hero */}
      <div className="mb-8 text-center">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Thu vien Sach Tieng Anh</h1>
        <p className="mt-2 text-muted-foreground">
          Doc sach tieng Anh de nang cao tu vung va ky nang doc hieu
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tim kiem sach..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Type filter */}
          <div className="flex gap-1 rounded-lg bg-muted p-1">
            {(["all", "free", "premium"] as FilterType[]).map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  typeFilter === type
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {type === "all" ? "Tat ca" : type === "free" ? "Mien phi" : "Premium"}
              </button>
            ))}
          </div>

          {/* Level filter */}
          <div className="flex gap-1 rounded-lg bg-muted p-1">
            {(["all", "A2", "B1", "B2", "C1"] as LevelFilter[]).map((level) => (
              <button
                key={level}
                onClick={() => setLevelFilter(level)}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  levelFilter === level
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {level === "all" ? "Level" : level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((book, i) => (
            <BookCard
              key={book.id}
              book={book}
              index={i}
              progress={getProgress(book.id)}
              isUnlocked={!book.isPremium || isBookUnlocked(book.id)}
              onAction={() => handleUnlock(book)}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

      {/* Unlock Dialog */}
      <AlertDialog open={!!unlockDialog} onOpenChange={() => setUnlockDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mo khoa sach</AlertDialogTitle>
            <AlertDialogDescription>
              Mo khoa "{unlockDialog?.title}" voi {unlockDialog?.rubyPrice} Ruby?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center justify-between rounded-lg bg-muted p-3 text-sm">
            <span>So du hien tai:</span>
            <span className="flex items-center gap-1 font-mono text-amber">
              <Gem className="h-4 w-4" /> {user.rubyBalance}
            </span>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Huy</AlertDialogCancel>
            <AlertDialogAction onClick={confirmUnlock} className="bg-amber text-amber-foreground hover:bg-amber/90">
              <Gem className="mr-1.5 h-4 w-4" /> Mo khoa {unlockDialog?.rubyPrice}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function BookCard({
  book,
  index,
  progress,
  isUnlocked,
  onAction,
}: {
  book: BookType;
  index: number;
  progress: { currentPage: number; percentComplete: number } | undefined;
  isUnlocked: boolean;
  onAction: () => void;
}) {
  const hasStarted = progress && progress.percentComplete > 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card"
    >
      {/* Cover */}
      <div
        className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${book.coverGradient}`}
      >
        <Book className="h-16 w-16 text-white/40" />

        {/* Premium badge */}
        {book.isPremium && !isUnlocked && (
          <Badge className="absolute right-2 top-2 bg-amber text-amber-foreground">
            PREMIUM
          </Badge>
        )}

        {/* Unlocked badge */}
        {book.isPremium && isUnlocked && (
          <Badge className="absolute right-2 top-2 bg-teal text-teal-foreground">
            DA MO KHOA
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3
          className="line-clamp-2 font-display text-sm font-semibold leading-snug"
          title={book.title}
        >
          {book.title}
        </h3>
        <p className="text-xs text-muted-foreground">{book.author}</p>

        {/* Meta */}
        <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px]">
          <Badge variant="outline" className="text-[10px]">
            {book.level}
          </Badge>
          <span className="text-muted-foreground">{book.totalPages} trang</span>
        </div>

        {/* Progress bar if started */}
        {hasStarted && (
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span>Tien do</span>
              <span className="font-mono">{progress.percentComplete}%</span>
            </div>
            <Progress value={progress.percentComplete} className="h-1.5" />
          </div>
        )}

        {/* Price / Action */}
        <div className="mt-auto flex items-center justify-between pt-2">
          {book.isPremium && !isUnlocked ? (
            <span className="flex items-center gap-1 font-mono text-sm text-amber">
              <Gem className="h-4 w-4" /> {book.rubyPrice}
            </span>
          ) : (
            <span className="text-xs text-teal">Mien phi</span>
          )}

          <Button
            size="sm"
            variant={book.isPremium && !isUnlocked ? "outline" : "default"}
            className={`btn-press text-xs ${
              book.isPremium && !isUnlocked
                ? "border-amber text-amber hover:bg-amber hover:text-amber-foreground"
                : ""
            }`}
            onClick={onAction}
          >
            {book.isPremium && !isUnlocked ? (
              <>
                Mo khoa <Gem className="ml-1 h-3 w-3" />
              </>
            ) : hasStarted ? (
              <>
                Doc tiep <ArrowRight className="ml-1 h-3 w-3" />
              </>
            ) : (
              <>
                Doc ngay <ArrowRight className="ml-1 h-3 w-3" />
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-muted/30 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Book className="h-8 w-8 text-muted-foreground" />
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold">Khong tim thay sach</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Thu thay doi bo loc hoac tu khoa tim kiem
        </p>
      </div>
    </div>
  );
}
