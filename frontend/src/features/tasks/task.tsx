export type TaskStatus = 'done' | 'failed' | 'todo';

export interface ITask {
  id: number;
  title: string;
  description: string;
  lang: string;
  level: string;
  category: string;
  status: TaskStatus;
}