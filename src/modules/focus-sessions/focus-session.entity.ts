import { Task } from '../tasks/task.entity';

export class FocusSession {
  id!: string;
  type!: string;
  duration!: number;
  interrupted!: boolean;
  startedAt!: Date;
  endedAt!: Date | null;
  taskId!: string | null;
  task!: Task | null;
  userId!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: FocusSession) {
    Object.assign(this, data);
    this.startedAt = new Date(data.startedAt);
    this.endedAt = data.endedAt ? new Date(data.endedAt) : null;
    this.task = data.task ? new Task(data.task) : null;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }
}
