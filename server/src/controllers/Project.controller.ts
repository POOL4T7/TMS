// controllers/CompanyController.ts

import { Request, Response } from "express";
import { Types, ObjectId, Schema } from "mongoose";
import { RequestWithSessionDetails } from "../interfaces/Custum.inteface";
import ProjectService, { Filter } from "../services/Project.service";
import { IProject } from "../interfaces/Project.interface";

class DepartmentController {
  constructor() {
    this.createProject = this.createProject.bind(this);
    this.getProjectList = this.getProjectList.bind(this);
  }
  async createProject(req: Request, res: Response): Promise<Response> {
    try {
      const companyId = (req as unknown as RequestWithSessionDetails)
        .sessionDetails.companyId!;
      const body: IProject = {
        name: req.body.name,
        slug: req.body.slug,
        owner: new Schema.Types.ObjectId(companyId),
        teamLead: req.body.teamLead,
        status: req.body.status,
        image: req.body.image,
        description: req.body.description,
        team: req.body.team,
        startDate: req.body.startDate,
        techStack: req.body.techStack,
      };
      await ProjectService.createProject(body);
      return res.status(201).json({
        success: true,
        message: "Department created successfully",
      });
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }

  async getProjectList(req: Request, res: Response): Promise<Response> {
    try {
      const companyId = (req as RequestWithSessionDetails).sessionDetails
        .companyId;
      const role = (req as RequestWithSessionDetails).sessionDetails.role;
      const userId = (req as RequestWithSessionDetails).sessionDetails._id;
      const filter: Filter = {};
      filter["owner"] = new Types.ObjectId(companyId!) as unknown as ObjectId;

      if (role === "manager") {
        filter.manager = userId;
        filter.status = "publish";
      } else if (role === "teamlead") {
        filter.teamLead = userId;
        filter.status = "publish";
      } else if (role === "employee") {
        filter.team = userId;
        filter.status = "publish";
      }

      const projects = await ProjectService.findWithStats(filter, 0, 10);
      return res.status(200).json({
        success: true,
        projectList: projects,
        message: "Project List",
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

export default new DepartmentController();
