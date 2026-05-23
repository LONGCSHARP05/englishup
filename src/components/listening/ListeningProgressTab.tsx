import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { useListeningStore } from "@/store/useListeningStore";
import { mockProgress } from "@/mock";

export function ListeningProgressTab() {
  const { sessions } = useListeningStore();

  const listeningData = useMemo(() => {
    const days = mockProgress.studyMinutes.slice(-14);
    const today = new Date();
    return days.map((minutes, i) => {
      const d = new Date(today.getTime() - (days.length - 1 - i) * 86400000);
      return {
        day: `${d.getDate()}/${d.getMonth() + 1}`,
        minutes,
      };
    });
  }, []);

  const accuracyData = useMemo(() => {
    const recent = sessions
      .filter((s) => s.status === "completed")
      .slice(0, 10)
      .reverse()
      .map((s, i) => ({
        session: `Bài ${i + 1}`,
        accuracy: s.overall_accuracy,
      }));
    return recent.length > 0 ? recent : [{ session: "Chưa có", accuracy: 0 }];
  }, [sessions]);

  const stats = useMemo(() => {
    const completed = sessions.filter((s) => s.status === "completed").length;
    const totalAccuracy =
      completed > 0
        ? Math.round(sessions.reduce((sum, s) => sum + s.overall_accuracy, 0) / completed)
        : 0;
    const totalMinutes = mockProgress.studyMinutes.reduce((a, b) => a + b, 0);
    return { completed, totalAccuracy, totalMinutes };
  }, [sessions]);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <StatTile
          label="Bài hoàn thành"
          value={stats.completed}
          color="text-teal"
          bg="bg-teal/10"
        />
        <StatTile
          label="Độ chính xác TB"
          value={`${stats.totalAccuracy}%`}
          color="text-amber"
          bg="bg-amber/10"
        />
        <StatTile
          label="Tổng thời gian"
          value={`${stats.totalMinutes} phút`}
          color="text-indigo"
          bg="bg-indigo/10"
        />
      </div>

      {/* Listening Time Chart */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-card">
        <h3 className="font-display text-base font-semibold">Thời gian luyện nghe</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">14 ngày gần nhất</p>
        <div className="mt-4 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={listeningData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                dataKey="minutes"
                stroke="var(--teal)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "var(--teal)" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Accuracy Trend Chart */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-card">
        <h3 className="font-display text-base font-semibold">Xu hướng độ chính xác</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">10 bài gần nhất</p>
        <div className="mt-4 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={accuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="session" stroke="var(--muted-foreground)" fontSize={10} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="accuracy" radius={[4, 4, 0, 0]}>
                {accuracyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.accuracy >= 85
                        ? "var(--teal)"
                        : entry.accuracy >= 70
                          ? "var(--amber)"
                          : "var(--coral)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Session History */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-card">
        <h3 className="font-display text-base font-semibold">Lịch sử bài học</h3>
        {sessions.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">Chưa có bài học nào.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {sessions
              .filter((s) => s.status === "completed")
              .slice(0, 5)
              .map((session, idx) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 p-3 text-sm"
                >
                  <div>
                    <div className="font-medium">Bài học {idx + 1}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(session.completed_at || Date.now()).toLocaleDateString("vi-VN")}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-amber">{session.overall_accuracy}%</div>
                    <div className="text-xs text-muted-foreground">
                      {session.correct_sentences}/{session.total_sentences}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatTile({
  label,
  value,
  color,
  bg,
}: {
  label: string;
  value: string | number;
  color: string;
  bg: string;
}) {
  return (
    <div className={`rounded-xl border border-border p-4 ${bg}`}>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`font-display text-2xl font-semibold ${color}`}>{value}</div>
    </div>
  );
}
