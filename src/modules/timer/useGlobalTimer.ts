import { useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  timerModeAtom,
  remainingSecondsAtom,
  isRunningAtom,
  sessionCountAtom,
  totalSecondsAtom,
  startedAtAtom,
  selectedTaskIdAtom,
  settingsAtom,
} from './timer.state';
import { focusSessionRepository } from '../focus-sessions/focus-session.repository';
import {
  playNotificationSound,
  sendNotification,
} from '../../lib/notification';

export function useGlobalTimer() {
  const [isRunning, setIsRunning] = useAtom(isRunningAtom);
  const setRemaining = useSetAtom(remainingSecondsAtom);
  const [mode, setMode] = useAtom(timerModeAtom);
  const [startedAt, setStartedAt] = useAtom(startedAtAtom);
  const [sessionCount, setSessionCount] = useAtom(sessionCountAtom);
  const total = useAtomValue(totalSecondsAtom);
  const settings = useAtomValue(settingsAtom);
  const selectedTaskId = useAtomValue(selectedTaskIdAtom);
  const setTotal = useSetAtom(totalSecondsAtom);

  useEffect(() => {
    if (!isRunning) return;

    const id = window.setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setIsRunning(false);
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning]);

  const handleComplete = async () => {
    const endedAt = new Date().toISOString();

    try {
      await focusSessionRepository.create({
        type: mode,
        duration: total,
        interrupted: false,
        startedAt: startedAt!,
        endedAt,
        taskId: mode === 'focus' ? selectedTaskId : null,
      });
    } catch (error) {
      console.error(error);
    }

    if (settings?.soundEnabled) playNotificationSound();
    const modeLabels = {
      focus: '集中',
      short_break: '短休憩',
      long_break: '長休憩',
    };
    sendNotification('タイマー完了', `${modeLabels[mode]}が終了しました`);

    let nextMode = mode;
    if (mode === 'focus') {
      const newCount = sessionCount + 1;
      setSessionCount(newCount);
      if (settings && newCount >= settings.sessionsBeforeLongBreak) {
        nextMode = 'long_break';
        setSessionCount(0);
      } else {
        nextMode = 'short_break';
      }
    } else {
      nextMode = 'focus';
    }

    const secs = settings?.getDuration(nextMode) ?? 25 * 60;
    setMode(nextMode);
    setRemaining(secs);
    setTotal(secs);
    setStartedAt(null);

    if (settings?.autoStartNext) {
      setTimeout(() => {
        setStartedAt(new Date().toISOString());
        setIsRunning(true);
      }, 500);
    }
  };
}
