import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { BookData } from "@/mock/books";
import { BookPage } from "./BookPage";
import { useBooksStore } from "@/store/useBooksStore";

type Props = {
  book: BookData;
  page: number; // 1-based; on spread layout this is the left page
  onChangePage: (p: number) => void;
};

const FLIP_MS = 600;

export function BookReader({ book, page, onChangePage }: Props) {
  const settings = useBooksStore((s) => s.settings);
  const [flip, setFlip] = useState<null | "next" | "prev">(null);
  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const useSpread = settings.layout === "spread" && !isMobile;
  const step = useSpread ? 2 : 1;
  const total = book.totalPages;

  const canPrev = page > 1 && !flip;
  const canNext = page + (useSpread ? 1 : 0) < total && !flip;

  const goNext = () => {
    if (!canNext) return;
    setFlip("next");
    window.setTimeout(() => {
      onChangePage(Math.min(total, page + step));
      setFlip(null);
    }, FLIP_MS);
  };
  const goPrev = () => {
    if (!canPrev) return;
    setFlip("prev");
    window.setTimeout(() => {
      onChangePage(Math.max(1, page - step));
      setFlip(null);
    }, FLIP_MS);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page, flip, useSpread]);

  const leftPage = book.pages[page - 1];
  const rightPage = useSpread ? book.pages[page] : null;
  const nextLeft = book.pages[page - 1 + step];
  const nextRight = useSpread ? book.pages[page + step] : null;

  return (
    <div className="relative mx-auto w-full max-w-5xl px-2 sm:px-4">
      <div
        ref={wrapperRef}
        className="book-perspective relative mx-auto"
        style={{ maxWidth: useSpread ? 980 : 520 }}
      >
        {/* Base spread */}
        <div
          className={`book-spread relative grid overflow-hidden rounded-lg ${
            useSpread ? "grid-cols-2" : "grid-cols-1"
          }`}
          style={{ aspectRatio: useSpread ? "1.55 / 1" : "0.72 / 1", minHeight: 480 }}
        >
          {/* Left page (static during next-flip; becomes destination during prev-flip) */}
          <div className="relative">
            {leftPage && (
              <BookPage
                bookId={book.id}
                page={flip === "prev" && nextLeft ? nextLeft : leftPage}
                totalPages={total}
                side={useSpread ? "left" : "single"}
                fontSize={settings.fontSize}
                theme={settings.theme}
              />
            )}
          </div>

          {/* Right page (only on spread) */}
          {useSpread && (
            <div className="relative border-l border-black/10">
              {(flip === "next" && nextRight ? nextRight : rightPage) && (
                <BookPage
                  bookId={book.id}
                  page={(flip === "next" && nextRight ? nextRight : rightPage)!}
                  totalPages={total}
                  side="right"
                  fontSize={settings.fontSize}
                  theme={settings.theme}
                />
              )}
            </div>
          )}

          {/* Flipping overlay */}
          <AnimatePresence>
            {flip && (
              <motion.div
                key={flip + "-" + page}
                className="flip-page pointer-events-none absolute top-0 h-full"
                style={{
                  left: useSpread ? (flip === "next" ? "50%" : "0%") : "0%",
                  width: useSpread ? "50%" : "100%",
                  transformOrigin: flip === "next" ? "left center" : "right center",
                  zIndex: 5,
                }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: flip === "next" ? -180 : 180 }}
                transition={{ duration: FLIP_MS / 1000, ease: [0.4, 0.0, 0.2, 1] }}
              >
                {/* Front face */}
                <div className="flip-face overflow-hidden rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                  {flip === "next" && rightPage && (
                    <BookPage
                      bookId={book.id}
                      page={rightPage}
                      totalPages={total}
                      side="right"
                      fontSize={settings.fontSize}
                      theme={settings.theme}
                    />
                  )}
                  {flip === "prev" && leftPage && (
                    <BookPage
                      bookId={book.id}
                      page={leftPage}
                      totalPages={total}
                      side="left"
                      fontSize={settings.fontSize}
                      theme={settings.theme}
                    />
                  )}
                </div>
                {/* Back face */}
                <div className="flip-face flip-back overflow-hidden rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                  {flip === "next" && nextLeft && (
                    <BookPage
                      bookId={book.id}
                      page={nextLeft}
                      totalPages={total}
                      side="left"
                      fontSize={settings.fontSize}
                      theme={settings.theme}
                    />
                  )}
                  {flip === "prev" && nextRight && (
                    <BookPage
                      bookId={book.id}
                      page={nextRight}
                      totalPages={total}
                      side="right"
                      fontSize={settings.fontSize}
                      theme={settings.theme}
                    />
                  )}
                  {flip === "prev" && !useSpread && nextLeft && (
                    <BookPage
                      bookId={book.id}
                      page={nextLeft}
                      totalPages={total}
                      side="single"
                      fontSize={settings.fontSize}
                      theme={settings.theme}
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Click hot zones on page edges */}
          <button
            type="button"
            aria-label="Trang trước"
            disabled={!canPrev}
            onClick={goPrev}
            className="absolute left-0 top-0 z-10 h-full w-[12%] cursor-w-resize disabled:cursor-default"
          />
          <button
            type="button"
            aria-label="Trang sau"
            disabled={!canNext}
            onClick={goNext}
            className="absolute right-0 top-0 z-10 h-full w-[12%] cursor-e-resize disabled:cursor-default"
          />
        </div>
      </div>

      {/* Nav controls */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={goPrev}
          disabled={!canPrev}
          className="btn-press inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground disabled:opacity-40"
          aria-label="Trang trước"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="font-mono text-xs text-muted-foreground">
          {useSpread && rightPage
            ? `Trang ${page}–${page + 1} / ${total}`
            : `Trang ${page} / ${total}`}
        </div>
        <button
          onClick={goNext}
          disabled={!canNext}
          className="btn-press inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground disabled:opacity-40"
          aria-label="Trang sau"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}