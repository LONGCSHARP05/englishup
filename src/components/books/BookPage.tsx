import { useMemo } from "react";
import type { BookPageData, BookVocabWord } from "@/mock/books";
import { VocabPopover } from "./VocabPopover";
import { HighlightToolbar } from "./HighlightToolbar";
import { useBooksStore } from "@/store/useBooksStore";
import { toast } from "sonner";

type Props = {
  bookId: string;
  page: BookPageData;
  totalPages: number;
  side?: "left" | "right" | "single";
  fontSize: "sm" | "md" | "lg";
  theme: "light" | "sepia" | "dark";
};

const sizeMap = {
  sm: "text-[14px] leading-7",
  md: "text-[15px] leading-8",
  lg: "text-[17px] leading-9",
} as const;

export function BookPage({ bookId, page, totalPages, side = "single", fontSize, theme }: Props) {
  const saveWord = useBooksStore((s) => s.saveWord);
  const addHighlight = useBooksStore((s) => s.addHighlight);

  const themeClass = theme === "light" ? "theme-light" : theme === "dark" ? "theme-dark" : "";
  const curlClass = side === "left" ? "page-curl-left" : "page-curl";

  const tokenMap = useMemo(() => {
    const map = new Map<string, BookVocabWord>();
    page.vocabularyWords.forEach((v) => map.set(v.word.toLowerCase(), v));
    return map;
  }, [page.vocabularyWords]);

  return (
    <div className={`relative h-full w-full overflow-hidden page-surface ${themeClass} ${curlClass}`}>
      <div className="flex h-full w-full flex-col px-6 py-7 sm:px-10 sm:py-10">
        <div
          className={`mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider ${
            theme === "dark" ? "text-white/40" : "text-foreground/40"
          }`}
        >
          <span>EnglishUp Library</span>
          <span>—</span>
        </div>

        <div
          className={`flex-1 overflow-y-auto ${sizeMap[fontSize]} ${
            theme === "dark" ? "text-[#efe9d8]" : "text-foreground/90"
          } font-display`}
        >
          {page.paragraphs.map((para, idx) => (
            <ParagraphWithVocab
              key={idx}
              text={para}
              tokenMap={tokenMap}
              onSaveWord={(word) => {
                saveWord(bookId, word);
                toast.success(`Đã lưu “${word}” vào từ vựng`);
              }}
              onCreateFlashcard={(word) => {
                toast.success(`Đã tạo flashcard cho “${word}”`);
              }}
              onHighlightSentence={(sentence) => {
                addHighlight({
                  bookId,
                  pageNumber: page.pageNumber,
                  selectedText: sentence,
                  color: "var(--amber)",
                });
                toast.success("Đã highlight đoạn này");
              }}
              onAddNote={(sentence) => {
                const note = window.prompt("Viết ghi chú cho đoạn này...");
                if (!note) return;
                addHighlight({
                  bookId,
                  pageNumber: page.pageNumber,
                  selectedText: sentence,
                  color: "var(--indigo)",
                  note,
                });
                toast.success("Đã lưu ghi chú");
              }}
            />
          ))}
        </div>

        <div
          className={`mt-4 flex items-center justify-between font-mono text-[11px] ${
            theme === "dark" ? "text-white/50" : "text-foreground/50"
          }`}
        >
          <span>Trang {page.pageNumber}</span>
          <span>
            {page.pageNumber} / {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
}

function ParagraphWithVocab({
  text,
  tokenMap,
  onSaveWord,
  onCreateFlashcard,
  onHighlightSentence,
  onAddNote,
}: {
  text: string;
  tokenMap: Map<string, BookVocabWord>;
  onSaveWord: (w: string) => void;
  onCreateFlashcard: (w: string) => void;
  onHighlightSentence: (s: string) => void;
  onAddNote: (s: string) => void;
}) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  return (
    <p className="mb-4">
      {sentences.map((sentence, si) => (
        <HighlightToolbar
          key={si}
          sentence={sentence.trim()}
          onHighlight={() => onHighlightSentence(sentence.trim())}
          onAddNote={() => onAddNote(sentence.trim())}
        >
          <Sentence
            text={sentence}
            tokenMap={tokenMap}
            onSaveWord={onSaveWord}
            onCreateFlashcard={onCreateFlashcard}
          />
        </HighlightToolbar>
      ))}
    </p>
  );
}

function Sentence({
  text,
  tokenMap,
  onSaveWord,
  onCreateFlashcard,
}: {
  text: string;
  tokenMap: Map<string, BookVocabWord>;
  onSaveWord: (w: string) => void;
  onCreateFlashcard: (w: string) => void;
}) {
  const parts = text.split(/(\s+|[.,!?;:"”“])/);
  return (
    <>
      {parts.map((part, i) => {
        const clean = part.toLowerCase().replace(/[^a-z']/g, "");
        const vocab = tokenMap.get(clean);
        if (vocab) {
          return (
            <VocabPopover
              key={i}
              word={vocab}
              onSave={() => onSaveWord(vocab.word)}
              onCreateFlashcard={() => onCreateFlashcard(vocab.word)}
            >
              <span className="vocab-token">{part}</span>
            </VocabPopover>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}