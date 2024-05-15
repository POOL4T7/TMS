import { Request, Response } from 'express';
import TaskService from '../services/Task.service';
import { ITask, TaskLog, TaskFilter } from '../interfaces/Task.interface';
import Custom from '../helpers/custom';

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
        logs: [
          {
            message: 'Task created',
            createdAt: new Date(),
            userId: Custom.getSessionDetails(req)._id.toString(),
          },
        ],
      };
      await TaskService.add(body);
      return res.status(201).json({
        success: true,
        message: 'New Task created successfully',
      });
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: 'server error',
      });
    }
  }

  async updateTask(req: Request, res: Response): Promise<Response> {
    try {
      const formData: Partial<ITask> = {};
      const logs: TaskLog[] = [];
      if (req.body.title) {
        formData.title = req.body.title;
        logs.push({
          message: 'Task Title updated',
          createdAt: new Date(),
          userId: Custom.getSessionDetails(req).toString().toString(),
        });
      }
      if (req.body.description) {
        formData.description = req.body.description;
        logs.push({
          message: 'Task description updated',
          createdAt: new Date(),
          userId: Custom.getSessionDetails(req).toString(),
        });
      }
      if (req.body.projectID) {
        formData.projectID = req.body.projectID;
        logs.push({
          message: 'Task projectID updated',
          createdAt: new Date(),
          userId: Custom.getSessionDetails(req).toString(),
        });
      }
      if (req.body.assignedTo) {
        formData.assignedTo = req.body.assignedTo;
        logs.push({
          message: 'Task assignedTo updated',
          createdAt: new Date(),
          userId: Custom.getSessionDetails(req).toString(),
        });
      }
      if (req.body.assignedBy) {
        formData.assignedBy = req.body.assignedBy;
        logs.push({
          message: 'Task assignedBy updated',
          createdAt: new Date(),
          userId: Custom.getSessionDetails(req).toString(),
        });
      }

      const filter: TaskFilter = {};
      filter._id = req.params.taskId;
      filter.assignedBy = Custom.getSessionDetails(req)._id;
      await TaskService.update(filter, formData);
      return res.status(201).json({
        success: true,
        message: 'Task Updated successfully',
      });
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: 'server error',
      });
    }
  }

  async getOwnerTaskList(req: Request, res: Response): Promise<Response> {
    try {
      const filter: TaskFilter = {};
      filter.assignedBy = Custom.getSessionDetails(req)._id;
      const list = await TaskService.assignedTask(filter);
      return res.status(201).json({
        success: true,
        message: 'Task Updated successfully',
        taskList: list,
      });
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: 'server error',
      });
    }
  }

  async getAssignedTaskList(req: Request, res: Response): Promise<Response> {
    try {
      const filter: TaskFilter = {};
      filter.assignedTo = Custom.getSessionDetails(req)._id;
      const list = await TaskService.assignedTask(filter);
      return res.status(201).json({
        success: true,
        message: 'Task Updated successfully',
        taskList: list,
      });
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: 'server error',
      });
    }
  }
}

export default new TaskController();
