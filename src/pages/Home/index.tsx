import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '../../modules/auth/current-user.state';
import { focusSessionRepository } from '../../modules/focus-sessions/focus-session.repository';
import { taskRepository } from '../../modules/tasks/task.repository';
import type { FocusSession } from '../../modules/focus-sessions/focus-session.entity';
import type { Task } from '../../modules/tasks/task.entity';
import TaskItem from '../../components/TaskItem';
import './index.css';

function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });
}

export default function Home() {
  const currentUser = useAtomValue(currentUserAtom);
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const today = new Date();
        const [sess, allTasks] = await Promise.all([
          focusSessionRepository.findByDate(today),
          taskRepository.findAll(),
        ]);
        setSessions(sess);
        setTasks(allTasks);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const focusSessions = sessions.filter((s) => s.type === 'focus');
  const totalFocusSeconds = focusSessions.reduce(
    (sum, s) => sum + s.duration,
    0,
  );
  const completedCount = focusSessions.filter((s) => !s.interrupted).length;
  const incompleteTasks = tasks.filter((t) => !t.completed);

  if (isLoading) {
    return (
      <div className="home-page">
        <div className="home-loading">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <section className="home-welcome">
        <h1 className="welcome-heading">
          おかえりなさい、{currentUser?.name}さん
        </h1>
        <p className="welcome-date">{formatDate(new Date())}</p>
      </section>

      <section className="home-stats">
        <div className="stat-card">
          <span className="stat-label">今日の集中時間</span>
          <span className="stat-value">{formatTime(totalFocusSeconds)}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">完了セッション</span>
          <span className="stat-value">
            {completedCount}
            <span className="stat-unit">回</span>
          </span>
        </div>
      </section>

      <section className="home-quick-action">
        <Link to="/timer" className="start-timer-button">
          タイマーを開始
        </Link>
      </section>

      <section className="home-tasks">
        <div className="tasks-header">
          <h2 className="tasks-heading">未完了タスク</h2>
          {incompleteTasks.length > 5 && (
            <Link to="/timer" className="tasks-show-all">
              すべて表示
            </Link>
          )}
        </div>
        {incompleteTasks.length === 0 ? (
          <p className="tasks-empty">タスクはありません</p>
        ) : (
          <ul className="tasks-list">
            {incompleteTasks.slice(0, 5).map((task) => (
              <TaskItem key={task.id} title={task.title} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
