import { Request, Response } from "express";
import TaskService from "../services/Task.service";
import { ITask, TaskFilter } from "../interfaces/Task.interface";
import Custom from "../helpers/custom";

class TaskController {
  async addTask(req: Request, res: Response): Promise<Response> {
    try {
      const body = {
        title: req.body.title,
        description: req.body.description,
        projectID: req.body.projectID,
        assignedTo: req.body.assignedTo,
        assignedBy: req.body.assignedBy,
        comment: [],
      };
      await TaskService.add(body);
      return res.status(201).json({
        success: true,
        message: "New Task created successfully",
      });
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }

  async updateTask(req: Request, res: Response): Promise<Response> {
    try {
      const formData: Partial<ITask> = {};
      req.body.title ? (formData.title = req.body.title) : "";
      req.body.description ? (formData.description = req.body.description) : "";
      req.body.projectID ? (formData.projectID = req.body.projectID) : "";
      req.body.assignedTo ? (formData.assignedTo = req.body.assignedTo) : "";
      req.body.assignedBy ? (formData.assignedBy = req.body.assignedBy) : "";
      const filter: TaskFilter = {};
      filter._id = req.params.taskId;
      filter.assignedBy = Custom.getSessionDetails(req)._id;
      await TaskService.update(filter, formData);
      return res.status(201).json({
        success: true,
        message: "Task Updated successfully",
      });
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }

  async getTaskList(req: Request, res: Response): Promise<Response> {
    try {
      const filter: TaskFilter = {};
      filter.assignedTo = Custom.getSessionDetails(req)._id;
      filter.status = "pending";
      const list = await TaskService.find(filter);
      return res.status(201).json({
        success: true,
        message: "Task Updated successfully",
        taskList: list,
      });
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }
}

export default new TaskController();
