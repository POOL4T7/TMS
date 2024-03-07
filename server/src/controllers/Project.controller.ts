import { Request, Response } from "express";
import { Types, ObjectId } from "mongoose";
import ProjectService, { Filter } from "../services/Project.service";
import { IProject } from "../interfaces/Project.interface";
import Custom from "../helpers/custom";

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
        teamLead: req.body.teamLead,
        status: req.body.status,
        image: req.body.image,
        description: req.body.description,
        team: req.body.team,
        startDate: req.body.startDate,
        techStack: req.body.techStack,
        manager: req.body.manager,
      };
      await ProjectService.createProject(body);
      return res.status(201).json({
        success: true,
        message: "Project added successfully",
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
      const userDetails = Custom.getSessionDetails(req);
      const role = userDetails.role;
      const userId = new Types.ObjectId(userDetails._id);
      const filter: Filter = {};
      filter["owner"] = new Types.ObjectId(
        userDetails.companyId
      ) as unknown as ObjectId;

      if (role === "manager") {
        filter.manager = userId;
      } else if (role === "teamlead") {
        filter.teamLead = userId;
      } else if (role === "employee") {
        // filter.team = {};
        filter["team.userId"] = userId;
      }
      role != "company" ? (filter.status = "publish") : "";
      const projects = await ProjectService.findWithStats(filter, 0, 10);
      return res.status(200).json({
        success: true,
        projectList: projects.projectList,
        totalProject: projects.totalProject,
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
