export interface Task {
  userId: number;
  id: number;
  title: string;
  description: string;
  assignedBy: string;
  deadline: Date;
  completed: boolean;
}
