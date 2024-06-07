import { Request, Response } from 'express';
import { Types, ObjectId } from 'mongoose';
import ProjectService, { Filter } from '../services/Project.service';
import { IProject } from '../interfaces/Project.interface';
import Custom from '../helpers/custom';
import Logger from '../helpers/Logger';

class DepartmentController {
  constructor() {
    this.createProject = this.createProject.bind(this);
    this.getProjectList = this.getProjectList.bind(this);
  }
  async createProject(req: Request, res: Response): Promise<Response> {
    try {
      const userDetails = Custom.getSessionDetails(req);
      const companyId = userDetails.companyId;
      const body: IProject = {
        name: req.body.name,
        slug: req.body.slug,
        owner: companyId!,
        teamLead: req.body.teamLead || null,
        status: req.body.status,
        image: req.body.image,
        description: req.body.description,
        team: req.body.team,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        techStack: req.body.techStack,
        manager: req.body.manager || null,
      };
      await ProjectService.createProject(body);
      return res.status(201).json({
        success: true,
        message: 'Project added successfully',
      });
    } catch (e: any) {
      Logger.error(e.message);
      return res.status(500).json({
        success: false,
        error: e.message,
        message: 'server error',
      });
    }
  }
  async updateProject(req: Request, res: Response): Promise<Response> {
    try {
      const userDetails = Custom.getSessionDetails(req);
      const companyId = userDetails.companyId;
      const filter: Filter = {
        owner: companyId,
        _id: req.params.projectId,
      };
      const formData: Partial<IProject> = {};

      if (req.body.name) formData.name = req.body.name;
      if (req.body.slug) formData.slug = req.body.slug;
      if (req.body.description) formData.description = req.body.description;
      if (req.body.manager) formData.manager = req.body.manager;
      if (req.body.teamLead) formData.teamLead = req.body.teamLead;
      if (req.body.team) formData.team = req.body.team;
      if (req.body.image) formData.image = req.body.image;
      if (req.body.status) formData.status = req.body.status;
      if (req.body.startDate) formData.startDate = req.body.startDate;
      if (req.body.endDate) formData.endDate = req.body.endDate;

      await ProjectService.findOneAndUpdate(filter, {
        $set: formData,
      });
      return res.status(201).json({
        success: true,
        message: 'Project Updated Successfully',
      });
    } catch (e: any) {
      Logger.error(e.message);
      return res.status(500).json({
        success: false,
        error: e.message,
        message: 'server error',
      });
    }
  }

  async getProjectList(req: Request, res: Response): Promise<Response> {
    try {
      await Custom.waitFiveSeconds();
      const userDetails = Custom.getSessionDetails(req);
      const role = userDetails.role;
      const userId = new Types.ObjectId(userDetails._id);
      const filter: Filter = {};
      filter['owner'] = new Types.ObjectId(
        userDetails.companyId
      ) as unknown as ObjectId;

      if (role === 'manager') {
        filter.manager = userId;
      } else if (role === 'teamlead') {
        filter.teamLead = userId;
      } else if (role === 'employee') {
        // filter.team = {};
        filter['team.userId'] = userId;
      }
      role != 'company' ? (filter.status = 'publish') : '';
      const projects = await ProjectService.findWithStats(filter, 0, 10);
      return res.status(200).json({
        success: true,
        projectList: projects.projectList,
        totalProject: projects.totalProject,
        message: 'Project List',
      });
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: 'server error',
      });
    }
  }

  async projectDetails(req: Request, res: Response): Promise<Response> {
    try {
      const userDetail = Custom.getSessionDetails(req);
      const filter: Filter = {
        slug: req.params.projectId,
        owner: userDetail.companyId,
      };
      userDetail.role != 'company' ? (filter.status = 'publish') : '';
      const d = await ProjectService.findOne(filter);
      return res.status(200).json({
        success: true,
        projectDetail: d,
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

export default new DepartmentController();
