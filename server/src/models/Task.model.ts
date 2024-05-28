import mongoose, { Schema, Document } from 'mongoose';

interface Message {
  message: string;
  userId: Schema.Types.ObjectId;
  time: Date;
}

interface ITask extends Document {
  title: string;
  description: string;
  assignedTo: [Schema.Types.ObjectId];
  assignedBy: Schema.Types.ObjectId;
  comment: Message[];
  status: string;
  projectID: Schema.Types.ObjectId;
  logs: Logs[];
  labels: string[];
  priority: string;
  taskType: string;
  startDate: Date;
  dueDate: Date;
}

interface Logs {
  message: string;
  createdAt: Date;
  userId: string;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['inactive', 'pending', 'completed', 'review', 'inprogress'],
    },
    assignedTo: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    projectID: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    assignedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comment: [
      {
        message: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        time: { type: Date, required: true },
      },
    ],
    logs: [
      {
        message: String,
        createdAt: Date,
        userId: String,
      },
    ],
    labels: [String],
    priority: {
      type: String,
      enum: ['high', 'moderate', 'critical', 'low'],
      default: 'low',
    },
    taskType: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;
