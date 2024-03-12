import { Types } from "mongoose";

interface Message {
  message: string;
  userId: Types.ObjectId | string;
  time: Date | string;
}

export interface ITask {
  _id?: Types.ObjectId | string;
  title: string;
  description: string;
  assignedTo: Types.ObjectId | string;
  assignedBy: Types.ObjectId | string;
  comment: Message[];
}

export interface TaskFilter {
  _id?: Types.ObjectId | string;
  assignedTo: Types.ObjectId | string;
  assignedBy: Types.ObjectId | string;
}
