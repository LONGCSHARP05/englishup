import { useState } from "react";
import { Highlighter, MessageSquare, Languages, Bookmark } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
  sentence: string;
  onHighlight: () => void;
  onAddNote: () => void;
};

export function HighlightToolbar({ children, sentence, onHighlight, onAddNote }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span
          onDoubleClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          className="cursor-text"
        >
          {children}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-1" align="center">
        <div className="flex items-center gap-0.5">
          <ToolBtn
            icon={<Highlighter className="h-4 w-4" />}
            label="Highlight"
            onClick={() => {
              onHighlight();
              setOpen(false);
            }}
          />
          <ToolBtn
            icon={<MessageSquare className="h-4 w-4" />}
            label="Ghi chú"
            onClick={() => {
              onAddNote();
              setOpen(false);
            }}
          />
          <ToolBtn
            icon={<Languages className="h-4 w-4" />}
            label="Dịch"
            onClick={() => {
              toast.message(`Bản dịch (mock): ${sentence.slice(0, 60)}...`);
              setOpen(false);
            }}
          />
          <ToolBtn
            icon={<Bookmark className="h-4 w-4" />}
            label="Lưu từ"
            onClick={() => {
              toast.success("Đã lưu từ vào từ vựng");
              setOpen(false);
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ToolBtn({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-foreground/80 hover:bg-accent"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}