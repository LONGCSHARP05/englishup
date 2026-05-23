import { useState } from "react";
import { Sparkles, Lightbulb, BookOpen, Zap, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ReadingArticle } from "@/mock";

type AssistantAction = "summarize" | "simplify" | "explain" | "grammar" | "vocabulary" | "tips";

export function AiAssistantSidebar({ article }: { article: ReadingArticle }) {
  const [selectedAction, setSelectedAction] = useState<AssistantAction | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const actions: Array<{ id: AssistantAction; label: string; icon: typeof Lightbulb }> = [
    { id: "summarize", label: "Tóm tắt đoạn", icon: BookOpen },
    { id: "simplify", label: "Đơn giản hóa", icon: Zap },
    { id: "explain", label: "Giải thích câu", icon: MessageSquare },
    { id: "grammar", label: "Ngữ pháp", icon: Sparkles },
    { id: "vocabulary", label: "Từ khó", icon: Lightbulb },
    { id: "tips", label: "Mẹo đọc", icon: Lightbulb },
  ];

  const handleClickAction = (action: AssistantAction) => {
    setIsThinking(true);
    setSelectedAction(action);

    setTimeout(() => {
      const responses: Record<AssistantAction, string> = {
        summarize: `Bài viết "${article.title}" thảo luận về chủ đề ${article.category}. Những ý chính bao gồm:\n\n• Ý tưởng chính được trình bày trong đoạn đầu\n• Các ví dụ và minh họa cụ thể\n• Kết luận quan trọng\n\nTóm lại, bài viết cung cấp thông tin chi tiết về chủ đề này.`,
        simplify: `Phiên bản đơn giản:\n\nBài viết nói về một chủ đề quan trọng. Có 3 ý chính:\n\n1. Điểm đầu tiên rất dễ hiểu\n2. Ví dụ cụ thể giúp giải thích\n3. Kết luận đóng vai trò quan trọng\n\nCố gắng đọc chậm để hiểu rõ hơn.`,
        explain: `Câu được chọn có cấu trúc ngữ pháp phổ biến.\n\n• Chủ ngữ (Subject): Thực hiện hành động\n• Động từ (Verb): Từ chỉ hành động\n• Tân ngữ (Object): Nhận tác động của hành động\n\nMẹo: Tìm động từ chính trước, sau đó tìm chủ ngữ và tân ngữ.`,
        grammar: `Các cấu trúc ngữ pháp trong bài:\n\n• Thì hiện tại đơn: diễn tả sự thật hiển nhiên\n• Thì hiện tại tiếp diễn: diễn tả hành động đang xảy ra\n• Thì quá khứ đơn: diễn tả hành động đã hoàn thành\n\nLưu ý: Đọc kỹ ngữ cảnh để hiểu thì được sử dụng.`,
        vocabulary: `Từ vựng khó trong bài:\n\n${article.vocabulary_highlighted.map((v) => `• ${v.word} — ${v.vietnameseMeaning}`).join("\n")}\n\nNhấp vào từ trong bài để xem chi tiết.`,
        tips: `Mẹo đọc hiểu:\n\n1. Đọc tiêu đề và đoạn đầu tiên trước\n2. Tìm chủ đề (topic) và ý chính (main idea)\n3. Đọc nhanh các đoạn còn lại\n4. Ghi chú từ vựng quan trọng\n5. Đọc lại các đoạn khó\n\nMẹo: Đừng tra từ vựng ngay, cố gắng đoán nghĩa từ ngữ cảnh.`,
      };

      setAiResponse(responses[action]);
      setIsThinking(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-lg font-semibold">Trợ lý AI</h3>
        <p className="text-sm text-muted-foreground">Hỗ trợ đọc hiểu với AI.</p>
      </div>

      <Separator />

      {/* Action Buttons */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-muted-foreground">Chọn hành động</div>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                onClick={() => handleClickAction(action.id)}
                variant={selectedAction === action.id ? "default" : "outline"}
                size="sm"
                className="justify-start"
              >
                <Icon className="mr-1.5 h-3.5 w-3.5" />
                {action.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* AI Response */}
      {isThinking && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 animate-pulse text-teal" />
            AI đang phân tích...
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full animate-pulse rounded bg-muted" />
            <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
          </div>
        </motion.div>
      )}

      {aiResponse && !isThinking && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-teal">
            <Sparkles className="h-4 w-4" />
            Phản hồi AI
          </div>
          <div className="rounded-lg border border-teal/30 bg-teal/5 p-4">
            <div className="whitespace-pre-line text-sm text-foreground">
              {aiResponse}
            </div>
          </div>
        </motion.div>
      )}

      <Separator />

      {/* Quick Tips */}
      <div className="rounded-lg border border-amber/30 bg-amber/5 p-3">
        <div className="flex gap-2">
          <Lightbulb className="h-4 w-4 shrink-0 text-amber" />
          <div>
            <div className="text-xs font-semibold text-amber">Mẹo nhanh</div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Nhấp vào từ được tô màu trong bài để tra cứu nghĩa và phát âm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
