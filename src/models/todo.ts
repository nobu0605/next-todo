export interface IStatus {
  name: string;
  color: string;
  todos: Todo[];
}

export interface IStatuses {
  [key: number]: IStatus;
}

export interface Todo {
  createdAt: string;
  description: string;
  id: number;
  status: string;
  title: string;
  userId: number;
}
