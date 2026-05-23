import { BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onExplore: () => void;
  onContinue: () => void;
  hasContinue: boolean;
};

export function BookStoreHero({ onExplore, onContinue, hasContinue }: Props) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[#fbf5e7] via-[#f6ecd5] to-[#efe1bf] p-6 sm:p-10">
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(120,90,40,0.08) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />
      </div>

      <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-foreground/70 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-amber" />
            Thư viện sách EnglishUp
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-[44px]">
            Thư viện sách tiếng Anh
          </h1>
          <p className="mt-3 text-base font-medium text-foreground/80 sm:text-lg">
            Đọc sách như thật, học từ vựng trong từng trang.
          </p>
          <p className="mt-2 max-w-xl text-sm text-foreground/65 sm:text-base">
            Khám phá sách tiếng Anh, mở khóa bằng Ruby, đánh dấu trang, highlight câu hay và lưu từ mới ngay khi đọc.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={onExplore} className="btn-press">
              <BookOpen className="h-4 w-4" />
              Khám phá sách
            </Button>
            <Button
              variant="outline"
              onClick={onContinue}
              disabled={!hasContinue}
              className="btn-press bg-white/70"
            >
              Tiếp tục đọc
            </Button>
          </div>
        </div>

        {/* Floating covers */}
        <div className="relative hidden h-56 md:block">
          <FloatingCover gradient="linear-gradient(135deg, var(--amber), var(--coral))" className="absolute left-2 top-2 rotate-[-6deg]" />
          <FloatingCover gradient="linear-gradient(135deg, var(--indigo), var(--teal))" className="absolute left-24 top-10 rotate-[4deg]" />
          <FloatingCover gradient="linear-gradient(135deg, var(--teal), var(--indigo))" className="absolute left-44 top-0 rotate-[-2deg]" />
        </div>
      </div>
    </section>
  );
}

function FloatingCover({ gradient, className }: { gradient: string; className?: string }) {
  return (
    <div
      className={`book-cover h-44 w-32 ${className ?? ""}`}
      style={{ background: gradient }}
      aria-hidden
    />
  );
}