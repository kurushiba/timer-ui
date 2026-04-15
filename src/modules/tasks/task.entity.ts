export class Task {
  id!: string;
  title!: string;
  completed!: boolean;
  userId!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Task) {
    Object.assign(this, data);
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }
}
