import { atom } from 'jotai';
import type { UserSetting } from '../user-settings/user-setting.entity';

export type TimerMode = 'focus' | 'short_break' | 'long_break';

export const timerModeAtom = atom<TimerMode>('focus');
export const remainingSecondsAtom = atom<number>(25 * 60);
export const isRunningAtom = atom<boolean>(false);

export const sessionCountAtom = atom<number>(0);
export const totalSecondsAtom = atom<number>(25 * 60);
export const startedAtAtom = atom<string | null>(null);
export const selectedTaskIdAtom = atom<string | null>(null);
export const settingsAtom = atom<UserSetting | null>(null);
