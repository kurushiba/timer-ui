import type { TimerMode } from '../timer/timer.state';

export class UserSetting {
  id!: string;
  focusDuration!: number;
  shortBreakDuration!: number;
  longBreakDuration!: number;
  sessionsBeforeLongBreak!: number;
  autoStartNext!: boolean;
  soundEnabled!: boolean;
  soundType!: string;
  userId!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Omit<UserSetting, 'getDuration'>) {
    Object.assign(this, data);
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }

  getDuration(mode: TimerMode): number {
    switch (mode) {
      case 'focus':
        return this.focusDuration * 60;
      case 'short_break':
        return this.shortBreakDuration * 60;
      case 'long_break':
        return this.longBreakDuration * 60;
      default:
        return this.focusDuration * 60;
    }
  }
}
