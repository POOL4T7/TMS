import { Types } from 'mongoose';

interface Message {
  message: string;
  userId: Types.ObjectId | string;
  time: Date | string;
}

export interface ITask {
  title: string;
  description: string;
  assignedTo:
    | [
        {
          _id: string;
          firstName: string;
        }
      ]
    | [string];
  assignedBy:
    | string
    | {
        _id: string;
        firstName: string;
      };
  comment: Message[];
  status: string;
  projectID: string;
  logs: TaskLog[];
  labels: string[];
  priority: string;
  taskType: string;
  startDate: Date | string;
  dueDate: Date | string;
}

export interface TaskFilter {
  _id?: Types.ObjectId | string;
  assignedTo?: Types.ObjectId | string;
  assignedBy?: Types.ObjectId | string;
  status?: string;
}

export interface TaskLog {
  message: string;
  createdAt: Date;
  userId: string;
}
