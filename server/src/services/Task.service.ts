import { ITask, TaskFilter } from "../interfaces/Task.interface";
import Task from "../models/Task.model";

class TaskService {
  static async addTask(formData: ITask): Promise<boolean> {
    try {
      const d = new Task(formData);
      await d.save();
      return true;
    } catch (e: any) {
      throw Error(e);
    }
  }
  static async TaskList(filter: TaskFilter): Promise<void> {
    try {
      const data = await Task.find(filter).select("_id title ").lean();
      console.log("data", data);
    } catch (e: any) {
      throw Error(e);
    }
  }
}

export default TaskService;
