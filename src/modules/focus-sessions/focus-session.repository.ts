import api from '../../lib/api';
import { FocusSession } from './focus-session.entity';

export interface WeeklyData {
  weekStart: string;
  weekEnd: string;
  daily: { date: string; dayOfWeek: string; totalSeconds: number }[];
}

export interface HeatmapEntry {
  date: string;
  totalSeconds: number;
}

export interface ByTaskEntry {
  taskId: string;
  taskTitle: string;
  totalSeconds: number;
}

export const focusSessionRepository = {
  async create(data: {
    type: string;
    duration: number;
    interrupted: boolean;
    startedAt: string;
    endedAt: string | null;
    taskId: string | null;
  }): Promise<FocusSession> {
    const result = await api.post('/sessions', data);
    return new FocusSession(result.data);
  },

  async findByDate(date: Date): Promise<FocusSession[]> {
    const dateStr = date.toISOString().split('T')[0];
    const result = await api.get(`/sessions?date=${dateStr}`);
    return result.data.map((d: FocusSession) => new FocusSession(d));
  },

  async getWeekly(): Promise<WeeklyData> {
    const result = await api.get('/sessions/weekly');
    return result.data;
  },

  async getHeatmap(): Promise<HeatmapEntry[]> {
    const result = await api.get('/sessions/heatmap');
    return result.data;
  },

  async getByTask(): Promise<ByTaskEntry[]> {
    const result = await api.get('/sessions/by-task');
    return result.data;
  },
};
