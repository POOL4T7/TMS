import { Request, Response } from 'express';
import TaskService from '../services/Task.service';
import { ITask, TaskLog, TaskFilter } from '../interfaces/Task.interface';
import Custom from '../helpers/custom';
import mongoose from 'mongoose';

class TaskController {
  async addTask(req: Request, res: Response): Promise<Response> {
    try {
      const body = {
        title: req.body.title,
        description: req.body.description,
        projectID: req.body.projectID,
        assignedTo: req.body.assignedTo,
        assignedBy: Custom.getSessionDetails(req)._id.toString(),
        comment: [],
        logs: [
          {
            message: 'Task created',
            createdAt: new Date(),
            userId: Custom.getSessionDetails(req)._id.toString(),
          },
        ],
        priority: req.body.priority,
        taskType: req.body.taskType,
        startDate: req.body.startDate,
        dueDate: req.body.dueDate,
        status: req.body.status,
        labels: req.body.labels,
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
      if (req.body.status) {
        formData.status = req.body.status;
        logs.push({
          message: `Task status updated to ${req.body.status}`,
          createdAt: new Date(),
          userId: Custom.getSessionDetails(req).toString(),
        });
      }
      if (req.body.priority) {
        formData.priority = req.body.priority;
        logs.push({
          message: `Task priority updated to ${req.body.priority}`,
          createdAt: new Date(),
          userId: Custom.getSessionDetails(req).toString(),
        });
      }
      if (req.body.taskType) {
        formData.taskType = req.body.taskType;
        logs.push({
          message: `Task taskType updated to ${req.body.taskType}`,
          createdAt: new Date(),
          userId: Custom.getSessionDetails(req).toString(),
        });
      }
      if (req.body.startDate) {
        formData.startDate = req.body.startDate;
        logs.push({
          message: `Task startDate updated to ${req.body.startDate}`,
          createdAt: new Date(),
          userId: Custom.getSessionDetails(req).toString(),
        });
      }
      if (req.body.dueDate) {
        formData.dueDate = req.body.dueDate;
        logs.push({
          message: `Task dueDate updated to ${req.body.dueDate}`,
          createdAt: new Date(),
          userId: Custom.getSessionDetails(req).toString(),
        });
      }

      const filter: TaskFilter = {};
      filter._id = req.params.taskId;
      filter.assignedBy = Custom.getSessionDetails(req)._id;
      await TaskService.update(filter, formData);
      return res.status(200).json({
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
      filter.assignedBy = new mongoose.Types.ObjectId(
        Custom.getSessionDetails(req)._id
      );

      const response = await TaskService.assignedTask(filter);
      return res.status(200).json({
        success: true,
        message: 'Own Task list',
        taskList: response.taskList,
        totalTask: response.totalCount,
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
      return res.status(200).json({
        success: true,
        message: 'Task list',
        taskList: list.taskList,
        totalTask: list.totalCount,
      });
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: 'server error',
      });
    }
  }

  async getTaskDetails(req: Request, res: Response): Promise<Response> {
    try {
      await Custom.waitFiveSeconds();
      const filter: TaskFilter = {};
      filter._id = req.params.taskId;
      const list = await TaskService.find(filter, '-createdAt');

      return res.status(200).json({
        success: true,
        message: 'Task Details',
        taskDetails: list.taskList.length ? list.taskList[0] : {},
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
