import { useState, useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  timerModeAtom,
  remainingSecondsAtom,
  isRunningAtom,
  totalSecondsAtom,
  startedAtAtom,
  selectedTaskIdAtom,
  settingsAtom,
} from '../../modules/timer/timer.state';
import { UserSetting } from '../../modules/user-settings/user-setting.entity';
import { taskRepository } from '../../modules/tasks/task.repository';
import type { Task } from '../../modules/tasks/task.entity';
import { focusSessionRepository } from '../../modules/focus-sessions/focus-session.repository';
import type { FocusSession } from '../../modules/focus-sessions/focus-session.entity';
import TimerDisplay from './TimerDisplay';
import TaskList from './TaskList';
import SessionLog from './SessionLog';
import './index.css';

export default function Timer() {
  const mode = useAtomValue(timerModeAtom);
  const [remaining, setRemaining] = useAtom(remainingSecondsAtom);
  const [isRunning, setIsRunning] = useAtom(isRunningAtom);
  const [total, setTotal] = useAtom(totalSecondsAtom);
  const [startedAt, setStartedAt] = useAtom(startedAtAtom);
  const [selectedTaskId, setSelectedTaskId] = useAtom(selectedTaskIdAtom);
  const settings = useAtomValue(settingsAtom);
  const setSettings = useSetAtom(settingsAtom);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 初期データ読み込み（タスクとセッションのみ。設定はuseSettingsLoaderが担当）
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [t, sess] = await Promise.all([
        taskRepository.findAll(),
        focusSessionRepository.findByDate(new Date()),
      ]);
      setTasks(t);
      setSessions(sess);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // タブタイトル更新
  useEffect(() => {
    if (isRunning) {
      const m = Math.floor(remaining / 60);
      const s = remaining % 60;
      document.title = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} - ポモドーロタイマー`;
    } else {
      document.title = 'ポモドーロタイマー';
    }
  }, [remaining, isRunning]);

  const handleStart = () => {
    if (!startedAt) {
      setStartedAt(new Date().toISOString());
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const resetSession = async () => {
    if (startedAt && remaining < total) {
      try {
        const newSession = await focusSessionRepository.create({
          type: mode,
          duration: total - remaining,
          interrupted: true,
          startedAt: startedAt,
          endedAt: new Date().toISOString(),
          taskId: mode === 'focus' ? selectedTaskId : null,
        });
        setSessions((prev) => [newSession, ...prev]);
      } catch (error) {
        console.error(error);
        window.alert('セッションの保存に失敗しました');
      }
    }

    setIsRunning(false);
    setStartedAt(null);
    const secs = settings?.getDuration(mode) ?? 25 * 60;
    setRemaining(secs);
    setTotal(secs);
  };

  const createTask = async (title: string) => {
    try {
      const task = await taskRepository.create(title);
      setTasks((prev) => [...prev, task]);
    } catch (error) {
      console.error(error);
      window.alert('タスクの追加に失敗しました');
    }
  };

  const toggleTaskComplete = async (task: Task) => {
    try {
      const updated = await taskRepository.update(task.id, {
        completed: !task.completed,
      });
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (error) {
      console.error(error);
      window.alert('タスクの更新に失敗しました');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await taskRepository.remove(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      if (selectedTaskId === id) setSelectedTaskId(null);
    } catch (error) {
      console.error(error);
      window.alert('タスクの削除に失敗しました');
    }
  };

  if (isLoading) {
    return (
      <div className="timer-page">
        <div className="timer-loading">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className="timer-page">
      <div className="timer-layout">
        <div className="timer-main">
          <TimerDisplay
            mode={mode}
            remainingSeconds={remaining}
            totalSeconds={total}
            isRunning={isRunning}
            onStart={handleStart}
            onPause={handlePause}
            onReset={resetSession}
          />

          <div className="auto-start-toggle">
            <label>自動開始</label>
            <button
              className={`toggle-button ${settings?.autoStartNext ? 'active' : ''}`}
              onClick={() =>
                settings &&
                setSettings(
                  new UserSetting({
                    ...settings,
                    autoStartNext: !settings.autoStartNext,
                  })
                )
              }
              type="button"
            >
              <span className="toggle-knob" />
            </button>
          </div>
        </div>

        <div className="timer-sidebar">
          <div className="task-selector">
            <label htmlFor="taskSelect">集中するタスク</label>
            <select
              id="taskSelect"
              value={selectedTaskId || ''}
              onChange={(e) => setSelectedTaskId(e.target.value || null)}
            >
              <option value="">なし</option>
              {tasks
                .filter((t) => !t.completed)
                .map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
            </select>
          </div>

          <TaskList
            tasks={tasks}
            onAdd={createTask}
            onToggleComplete={toggleTaskComplete}
            onDelete={handleDeleteTask}
          />
          <SessionLog sessions={sessions} />
        </div>
      </div>
    </div>
  );
}
