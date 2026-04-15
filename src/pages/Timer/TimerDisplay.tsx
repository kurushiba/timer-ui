import { useAtomValue } from 'jotai';
import type { TimerMode } from '../../modules/timer/timer.state';
import { sessionCountAtom, settingsAtom } from '../../modules/timer/timer.state';

interface TimerDisplayProps {
  mode: TimerMode;
  remainingSeconds: number;
  totalSeconds: number;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const MODE_LABELS: Record<TimerMode, string> = {
  focus: '集中',
  short_break: '短休憩',
  long_break: '長休憩',
};

export default function TimerDisplay({
  mode,
  remainingSeconds,
  totalSeconds,
  isRunning,
  onStart,
  onPause,
  onReset,
}: TimerDisplayProps) {
  const currentSessionCount = useAtomValue(sessionCountAtom);
  const settings = useAtomValue(settingsAtom);
  const sessionsBeforeLongBreak = settings?.sessionsBeforeLongBreak ?? 4;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const progress = totalSeconds > 0 ? (totalSeconds - remainingSeconds) / totalSeconds : 0;

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="timer-display">
      <div className={`timer-mode-label mode-${mode}`}>
        {MODE_LABELS[mode]}
      </div>

      <div className="timer-circle-wrapper">
        <svg className="timer-svg" viewBox="0 0 280 280">
          <circle
            className="timer-track"
            cx="140"
            cy="140"
            r={radius}
            fill="none"
            strokeWidth="6"
          />
          <circle
            className={`timer-progress mode-${mode}`}
            cx="140"
            cy="140"
            r={radius}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 140 140)"
          />
        </svg>
        <div className="timer-time">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      <div className="session-dots">
        {Array.from({ length: sessionsBeforeLongBreak }).map((_, i) => (
          <span
            key={i}
            className={`session-dot ${i < currentSessionCount ? 'completed' : ''}`}
          />
        ))}
      </div>

      <div className="timer-controls">
        {!isRunning ? (
          <button className="control-button start-button" onClick={onStart} type="button">
            開始
          </button>
        ) : (
          <button className="control-button pause-button" onClick={onPause} type="button">
            一時停止
          </button>
        )}
        <button className="control-button reset-button" onClick={onReset} type="button">
          リセット
        </button>
      </div>
    </div>
  );
}
