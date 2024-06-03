import { ObjectId, Types } from 'mongoose';
import Project from '../models/Project.model';
import { Sort } from '../interfaces/Custum.inteface';
import { IProject, ProjectStats } from '../interfaces/Project.interface';

// interface ProjectTeam {
//   departmentId?: string;
//   userId: string | Types.ObjectId;
// }

export interface Filter {
  _id?: string;
  status?: string;
  slug?: string;
  owner?: string | ObjectId;
  manager?: string | Types.ObjectId | null;
  teamLead?: string | Types.ObjectId | null;
  // team?: ProjectTeam;
  'team.userId'?: Types.ObjectId | string;
}

class ProjectService {
  // Create a new project
  static async createProject(projectData: IProject): Promise<IProject> {
    try {
      const project = new Project(projectData);
      const savedProject = await project.save();
      return savedProject;
    } catch (error: any) {
      throw new Error(`Error creating project: ${error.message}`);
    }
  }

  static async findWithStats(
    filter: Filter,
    skip: number = 0,
    limit: number = 10,
    sort: Sort = { _id: -1 }
  ): Promise<ProjectStats> {
    try {
      const projects = await Project.find(filter)
        .populate({ path: 'manager', select: 'firstName lastName' })
        .populate({ path: 'teamLead', select: 'firstName lastName' })
        .select({
          slug: 1,
          name: 1,
          image: 1,
          teamSize: { $size: '$team' },
          status: 1,
        })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
      const totalProject = await Project.countDocuments(filter);

      return { projectList: projects, totalProject };
    } catch (error: any) {
      throw new Error(`Error getting projects: ${error.message}`);
    }
  }

  static async findOne(filter: Filter): Promise<IProject | null> {
    try {
      const position = await Project.findOne(filter)
        .populate({ path: 'team.departmentId', select: 'name' })
        .populate({ path: 'team.userId', select: 'firstName lastName' })
        .populate({ path: 'manager', select: 'firstName lastName' })
        .populate({ path: 'teamLead', select: 'firstName lastName' })
        .lean();
      return position;
    } catch (error: any) {
      throw new Error(`Error getting position: ${error.message}`);
    }
  }

  static async findOneAndUpdate(
    filter: Filter,
    formData: any
  ): Promise<boolean> {
    try {
      const data = await Project.findOneAndUpdate(filter, formData);
      return data ? true : false;
    } catch (error: any) {
      throw new Error(`Error deleting position: ${error.message}`);
    }
  }

  static async deletePosition(filter: Filter): Promise<boolean> {
    try {
      const data = await Project.findOneAndDelete(filter);
      return data ? true : false;
    } catch (error: any) {
      throw new Error(`Error deleting position: ${error.message}`);
    }
  }

  static async countDocuments(filter: Filter): Promise<number> {
    try {
      const totalProject = await Project.countDocuments(filter);
      return totalProject;
    } catch (error: any) {
      throw new Error(`Error deleting position: ${error.message}`);
    }
  }
}

export default ProjectService;
