import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useVocabStore } from "@/store/useVocabStore";
import { mockProgress } from "@/mock";

export function StatsTab() {
  const { vocab } = useVocabStore();

  const dailyData = useMemo(() => {
    const days = mockProgress.wordsReviewed.slice(-14);
    const today = new Date();
    return days.map((cards, i) => {
      const d = new Date(today.getTime() - (days.length - 1 - i) * 86400000);
      return {
        day: `${d.getDate()}/${d.getMonth() + 1}`,
        cards,
      };
    });
  }, []);

  const pieData = useMemo(() => {
    const count = (s: string) => vocab.filter((v) => v.status === s).length;
    return [
      { name: "Mới", value: count("new"), color: "var(--indigo)" },
      { name: "Đang học", value: count("learning"), color: "var(--amber)" },
      { name: "Cần ôn", value: count("review"), color: "var(--coral)" },
      { name: "Thành thạo", value: count("mastered"), color: "var(--teal)" },
    ];
  }, [vocab]);

  const totalMinutes = mockProgress.studyMinutes.reduce((a, b) => a + b, 0);
  const accuracy = 89;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
        <SummaryTile label="Độ chính xác tuần này" value={`${accuracy}%`} color="text-teal" bg="bg-teal/10" />
        <SummaryTile label="Tổng thời gian học" value={`${totalMinutes} phút`} color="text-indigo" bg="bg-indigo/10" />
      </div>

      <div className="rounded-xl border border-border bg-card p-4 shadow-card">
        <h3 className="font-display text-base font-semibold">Thẻ ôn mỗi ngày</h3>
        <p className="text-xs text-muted-foreground">14 ngày gần nhất</p>
        <div className="mt-3 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="cards"
                stroke="var(--teal)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "var(--teal)" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 shadow-card">
        <h3 className="font-display text-base font-semibold">Phân bố trạng thái</h3>
        <p className="text-xs text-muted-foreground">Theo toàn bộ kho từ vựng</p>
        <div className="mt-3 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={3}
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function SummaryTile({
  label, value, color, bg,
}: { label: string; value: string; color: string; bg: string }) {
  return (
    <div className={`rounded-xl border border-border p-4 ${bg}`}>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`font-display text-2xl font-semibold ${color}`}>{value}</div>
    </div>
  );
}