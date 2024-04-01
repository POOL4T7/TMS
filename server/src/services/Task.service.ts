import { ITask, TaskFilter } from "../interfaces/Task.interface";
import Task from "../models/Task.model";

interface TaskWithPagination {
  taskList: ITask[];
  totalCount: number;
}

class TaskService {
  static async add(formData: ITask): Promise<boolean> {
    try {
      const d = new Task(formData);
      await d.save();
      return true;
    } catch (e: any) {
      throw Error(e);
    }
  }
  static async find(filter: TaskFilter): Promise<TaskWithPagination> {
    try {
      const data = await Task.find(filter).select("_id title ").lean();
      return { taskList: data as unknown as ITask[], totalCount: 0 };
    } catch (e: any) {
      throw Error(e);
    }
  }
  static async update(filter: TaskFilter, formData: any): Promise<void> {
    try {
      const data = await Task.findOneAndUpdate(filter, { $set: formData });
      console.log("data", data);
    } catch (e: any) {
      throw Error(e);
    }
  }
}

export default TaskService;
