interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  profilePicture?: string;
}

interface Message {
  message: string;
  userId: string;
  time: Date | string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  assignedTo: User[];
  assignedBy: User;
  comment?: Message[];
  status: string;
  projectID:
    | {
        _id: string;
        name: string;
      }
    | string;
  logs: TaskLog[];
  labels: string[];
  priority: string;
  taskType: string;
  startDate?: string;
  dueDate: string;
}

export interface TaskLog {
  message: string;
  createdAt: Date;
  userId: string;
}

interface TaskObj {
  _id: string;
  taskList: Task[];
}

export interface TaskGetApiData {
  taskList: TaskObj[];
  totalTask: number;
}
export interface TaskDetailsGetApiData {
  taskDetails: TaskObj;
}

export interface TaskGetApiResponse extends TaskGetApiData {
  success: boolean;
  message: string;
}

export interface TaskDetailsGetApiResponse extends TaskDetailsGetApiData {
  success: boolean;
  message: string;
}

export interface ReturnObject {
  success: boolean;
  message: string;
}
