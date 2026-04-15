import api from '../../lib/api';
import { Task } from './task.entity';

export const taskRepository = {
  async findAll(): Promise<Task[]> {
    const result = await api.get('/tasks');
    return result.data.map((task: Task) => new Task(task));
  },

  async create(title: string): Promise<Task> {
    const result = await api.post('/tasks', { title });
    return new Task(result.data);
  },

  async update(id: string, data: Partial<Task>): Promise<Task> {
    const result = await api.patch(`/tasks/${id}`, data);
    return new Task(result.data);
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};
