import { ITask, TaskFilter } from '../interfaces/Task.interface';
import Task from '../models/Task.model';

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
  static async find(
    filter: TaskFilter,
    select = '_id title'
  ): Promise<TaskWithPagination> {
    try {
      const data = await Task.find(filter)
        .populate({ path: 'assignedTo' })
        .select(select)
        .lean();
      return { taskList: data as unknown as ITask[], totalCount: 0 };
    } catch (e: any) {
      throw Error(e);
    }
  }
  static async assignedTask(filter: TaskFilter): Promise<TaskWithPagination> {
    try {
      const counts = await Task.countDocuments(filter);
      const data = await Task.aggregate([
        {
          $match: filter,
        },
        {
          $lookup: {
            from: 'users',
            foreignField: '_id',
            localField: 'assignedTo',
            as: 'assignedTo',
            pipeline: [
              {
                $project: {
                  firstName: 1,
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: 'users',
            foreignField: '_id',
            localField: 'assignedBy',
            as: 'taskAssignedBy',
            pipeline: [
              {
                $project: {
                  firstName: 1,
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: 'projects',
            foreignField: '_id',
            localField: 'projectID',
            as: 'project',
            pipeline: [
              {
                $project: {
                  name: 1,
                },
              },
            ],
          },
        },
        {
          $addFields: {
            assignedBy: { $first: '$taskAssignedBy' },
            projectID: { $first: '$project' },
          },
        },
        {
          $project: {
            title: 1,
            description: 1,
            assignedTo: 1,
            assignedBy: 1,
            status: 1,
            projectID: 1,
            labels: 1,
            priority: 1,
            taskType: 1,
            startDate: 1,
            dueDate: 1,
          },
        },
        {
          $group: {
            _id: '$status',
            taskList: { $push: '$$ROOT' },
          },
        },
      ]);
      return { taskList: data as unknown as ITask[], totalCount: counts };
    } catch (e: any) {
      throw Error(e);
    }
  }
  static async update(filter: TaskFilter, formData: any): Promise<void> {
    try {
      const data = await Task.findOneAndUpdate(filter, { $set: formData });
      console.log('data', data);
    } catch (e: any) {
      throw Error(e);
    }
  }
}

export default TaskService;
