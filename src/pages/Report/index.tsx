import { useState, useEffect } from 'react';
import {
  focusSessionRepository,
  type WeeklyData,
  type HeatmapEntry,
  type ByTaskEntry,
} from '../../modules/focus-sessions/focus-session.repository';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import './index.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const TASK_COLORS = [
  '#e74c3c',
  '#3498db',
  '#2ecc71',
  '#f39c12',
  '#9b59b6',
  '#1abc9c',
  '#e67e22',
  '#34495e',
];

function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function getHeatmapColor(totalSeconds: number): string {
  if (totalSeconds === 0) return 'var(--heatmap-empty)';
  const minutes = totalSeconds / 60;
  if (minutes < 30) return 'var(--heatmap-level1)';
  if (minutes < 60) return 'var(--heatmap-level2)';
  if (minutes < 120) return 'var(--heatmap-level3)';
  return 'var(--heatmap-level4)';
}

function toLocalDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function buildHeatmapGrid(
  entries: HeatmapEntry[],
): { date: string; totalSeconds: number }[][] {
  const map = new Map(entries.map((e) => [e.date, e.totalSeconds]));

  const today = new Date();

  // Start: 89 days ago, extended back to Monday
  const rawStart = new Date(today);
  rawStart.setDate(today.getDate() - 89);
  const startDow = (rawStart.getDay() + 6) % 7; // 0=Mon, 6=Sun
  const start = new Date(rawStart);
  start.setDate(rawStart.getDate() - startDow);

  // End: today, extended forward to Sunday
  const endDow = (today.getDay() + 6) % 7;
  const end = new Date(today);
  end.setDate(today.getDate() + (6 - endDow));

  // Generate all days from start (Monday) to end (Sunday)
  const days: { date: string; totalSeconds: number }[] = [];
  const current = new Date(start);
  while (current <= end) {
    const dateStr = toLocalDateString(current);
    days.push({ date: dateStr, totalSeconds: map.get(dateStr) ?? 0 });
    current.setDate(current.getDate() + 1);
  }

  // Group into weeks (columns) — always 7 days per week
  const weeks: { date: string; totalSeconds: number }[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return weeks;
}

export default function Report() {
  const [isLoading, setIsLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState<WeeklyData | null>(null);
  const [heatmapData, setHeatmapData] = useState<HeatmapEntry[]>([]);
  const [byTaskData, setByTaskData] = useState<ByTaskEntry[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [weekly, heatmap, byTask] = await Promise.all([
        focusSessionRepository.getWeekly(),
        focusSessionRepository.getHeatmap(),
        focusSessionRepository.getByTask(),
      ]);
      setWeeklyData(weekly);
      setHeatmapData(heatmap);
      setByTaskData(byTask);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="report-page">
        <div className="report-loading">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  // Weekly bar chart data
  const weeklyTotalSeconds =
    weeklyData?.daily.reduce((sum, d) => sum + d.totalSeconds, 0) ?? 0;
  const barData = {
    labels: weeklyData?.daily.map((d) => d.dayOfWeek) ?? DAY_LABELS,
    datasets: [
      {
        label: '集中時間（分）',
        data:
          weeklyData?.daily.map((d) => Math.round(d.totalSeconds / 60)) ?? [],
        backgroundColor: 'rgba(231, 76, 60, 0.7)',
        borderColor: '#e74c3c',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: { parsed: { y: number | null } }) =>
            `${context.parsed.y ?? 0}分`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: 'rgba(0,0,0,0.5)' },
        grid: { color: 'rgba(0,0,0,0.06)' },
      },
      x: {
        ticks: { color: 'rgba(0,0,0,0.5)' },
        grid: { display: false },
      },
    },
  };

  // Doughnut chart data
  const doughnutData = {
    labels: byTaskData.map((d) => d.taskTitle),
    datasets: [
      {
        data: byTaskData.map((d) => Math.round(d.totalSeconds / 60)),
        backgroundColor: byTaskData.map(
          (_, i) => TASK_COLORS[i % TASK_COLORS.length],
        ),
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { color: 'rgba(0,0,0,0.7)', padding: 16 },
      },
      tooltip: {
        callbacks: {
          label: (context: { label: string; parsed: number }) =>
            `${context.label}: ${context.parsed}分`,
        },
      },
    },
  };

  // Heatmap
  const weeks = buildHeatmapGrid(heatmapData);

  return (
    <div className="report-page">
      <h1 className="report-title">レポート</h1>

      {/* Weekly Summary */}
      <div className="report-summary">
        <div className="summary-card">
          <span className="summary-label">今週の合計集中時間</span>
          <span className="summary-value">
            {formatTime(weeklyTotalSeconds)}
          </span>
        </div>
        {weeklyData && (
          <div className="summary-card">
            <span className="summary-label">期間</span>
            <span className="summary-value summary-date">
              {weeklyData.weekStart} 〜 {weeklyData.weekEnd}
            </span>
          </div>
        )}
      </div>

      <div className="report-grid">
        {/* Bar Chart */}
        <div className="report-card">
          <h2 className="card-heading">曜日別集中時間</h2>
          <div className="chart-container">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="report-card">
          <h2 className="card-heading">タスク別集中時間</h2>
          {byTaskData.length > 0 ? (
            <div className="chart-container">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          ) : (
            <p className="empty-message">データがありません</p>
          )}
        </div>
      </div>

      {/* Heatmap */}
      <div className="report-card heatmap-card">
        <h2 className="card-heading">集中カレンダー（直近90日）</h2>
        <div className="heatmap-wrapper">
          <div className="heatmap-day-labels">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
              (label, i) => (
                <span key={i} className="heatmap-day-label">
                  {label}
                </span>
              ),
            )}
          </div>
          <div className="heatmap-grid">
            {weeks.map((week, wi) => (
              <div key={wi} className="heatmap-column">
                {week.map((day, di) => (
                  <div
                    key={di}
                    className="heatmap-cell"
                    style={{
                      backgroundColor: getHeatmapColor(day.totalSeconds),
                    }}
                    title={`${day.date}: ${formatTime(day.totalSeconds)}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="heatmap-legend">
          <span className="heatmap-legend-label">少</span>
          <div
            className="heatmap-legend-cell"
            style={{ backgroundColor: 'var(--heatmap-empty)' }}
          />
          <div
            className="heatmap-legend-cell"
            style={{ backgroundColor: 'var(--heatmap-level1)' }}
          />
          <div
            className="heatmap-legend-cell"
            style={{ backgroundColor: 'var(--heatmap-level2)' }}
          />
          <div
            className="heatmap-legend-cell"
            style={{ backgroundColor: 'var(--heatmap-level3)' }}
          />
          <div
            className="heatmap-legend-cell"
            style={{ backgroundColor: 'var(--heatmap-level4)' }}
          />
          <span className="heatmap-legend-label">多</span>
        </div>
      </div>
    </div>
  );
}
