import mongoose, { Schema, Document } from "mongoose";

interface Message {
  message: string;
  userId: Schema.Types.ObjectId;
  time: Date;
}

interface ITask extends Document {
  title: string;
  description: string;
  assignedTo: Schema.Types.ObjectId;
  assignedBy: Schema.Types.ObjectId;
  comment: Message[];
  status: string;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comment: [
      {
        message: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        time: { type: Date, required: true },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
