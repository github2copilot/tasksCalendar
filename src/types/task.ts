export interface Task {
  id: string;
  title: string;
  date: Date;
  completed: boolean;
  description?: string;
}

export interface DayStats {
  total: number;
  completed: number;
  progress: number;
}