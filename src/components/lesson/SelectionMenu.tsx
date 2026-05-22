import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Highlighter, Languages, Sparkles, BookmarkPlus } from "lucide-react";
import { toast } from "sonner";
import { useLessonStore } from "@/store/useLessonStore";

type Pos = { x: number; y: number; text: string };

export function SelectionMenu({ containerId, lessonId }: { containerId: string; lessonId: string }) {
  const [pos, setPos] = useState<Pos | null>(null);
  const addHighlight = useLessonStore((s) => s.addHighlight);

  useEffect(() => {
    function onUp() {
      const sel = window.getSelection();
      const text = sel?.toString().trim();
      const container = document.getElementById(containerId);
      if (!text || !sel || !container) {
        setPos(null);
        return;
      }
      const anchor = sel.anchorNode;
      if (!anchor || !container.contains(anchor.parentElement ?? anchor as Node)) {
        setPos(null);
        return;
      }
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) {
        setPos(null);
        return;
      }
      setPos({
        x: rect.left + rect.width / 2 + window.scrollX,
        y: rect.top + window.scrollY - 8,
        text,
      });
    }
    function onDown() {
      if (window.getSelection()?.toString().trim() === "") setPos(null);
    }
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchend", onUp);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchend", onUp);
      document.removeEventListener("mousedown", onDown);
    };
  }, [containerId]);

  function clear() {
    window.getSelection()?.removeAllRanges();
    setPos(null);
  }

  return (
    <AnimatePresence>
      {pos && (
        <motion.div
          initial={{ opacity: 0, y: 4, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.95 }}
          transition={{ duration: 0.12 }}
          style={{ left: pos.x, top: pos.y }}
          className="pointer-events-auto fixed z-50 flex -translate-x-1/2 -translate-y-full items-center gap-0.5 rounded-full border border-border bg-popover px-1 py-1 shadow-card-hover"
        >
          <MenuBtn
            Icon={Highlighter}
            label="Highlight"
            onClick={() => {
              addHighlight({ lessonId, text: pos.text });
              toast.success("Đã highlight");
              clear();
            }}
          />
          <MenuBtn
            Icon={Languages}
            label="Dịch"
            onClick={() => {
              toast("Bản dịch (mock): " + pos.text.slice(0, 60));
              clear();
            }}
          />
          <MenuBtn
            Icon={Sparkles}
            label="Giải thích"
            onClick={() => {
              toast("AI sẽ giải thích đoạn này (mock)");
              clear();
            }}
          />
          <MenuBtn
            Icon={BookmarkPlus}
            label="Lưu từ"
            onClick={() => {
              toast.success("Đã lưu vào danh sách từ");
              clear();
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MenuBtn({
  Icon,
  label,
  onClick,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium text-popover-foreground hover:bg-muted"
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}