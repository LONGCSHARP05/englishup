import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function AiReaderTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-card/50 p-4">
        <p className="text-sm text-muted-foreground">
          AI Reader giúp bạn đọc hiểu sâu hơn với hỗ trợ từ vựng thông minh và trợ lý AI.
        </p>
      </div>

      {/* Coming Soon Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid min-h-[400px] place-items-center"
      >
        <div className="max-w-md space-y-6 text-center">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal/20 to-indigo/20">
              <Sparkles className="h-10 w-10 text-teal" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold">Chọn bài để bắt đầu</h2>
            <p className="text-sm text-muted-foreground">
              Quay lại tab "Đọc hôm nay" để chọn một bài đọc và trải nghiệm AI Reader với:
            </p>
          </div>

          <div className="grid gap-2 text-left">
            <FeatureItem>Phông chữ và khoảng cách dòng tùy chỉnh</FeatureItem>
            <FeatureItem>Từ vựng nổi bật — nhấp để tra cứu</FeatureItem>
            <FeatureItem>Trợ lý AI hỗ trợ đọc hiểu</FeatureItem>
            <FeatureItem>Chế độ đọc sáng/tối</FeatureItem>
            <FeatureItem>Bài kiểm tra hiểu bài</FeatureItem>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-card/50 px-3 py-2">
      <Sparkles className="h-4 w-4 shrink-0 text-teal" />
      <span className="text-sm text-muted-foreground">{children}</span>
    </div>
  );
}
