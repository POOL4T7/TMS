// controllers/CompanyController.ts

import { Request, Response } from "express";
import { Types, ObjectId, Schema } from "mongoose";
import DepartmentService from "../services/Department.service";
import { RequestWithSessionDetails } from "../interfaces/Custum.inteface";
import ProjectService from "../services/Project.service";
import { IProject } from "../interfaces/Project.interface";

class DepartmentController {
  constructor() {
    this.createProject = this.createProject.bind(this);
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

  async getDepartments(req: Request, res: Response): Promise<Response> {
    try {
      const companyId = (req as unknown as RequestWithSessionDetails)
        .sessionDetails.companyId;
      const departments = await DepartmentService.departmentListWithStats(
        { companyId: new Types.ObjectId(companyId!) as unknown as ObjectId }, // need thinking
        0,
        10
      );
      return res.json({
        success: true,
        teamList: departments,
        message: "Department List",
      });
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }
  async getDepartmentList(req: Request, res: Response): Promise<Response> {
    try {
      const companyId = new Types.ObjectId(
        (req as unknown as RequestWithSessionDetails).sessionDetails.companyId!
      ) as unknown as ObjectId;

      const departments = await DepartmentService.findAll(
        { companyId: companyId, status: "active" },
        "name"
      );
      return res.json({
        success: true,
        teamList: departments,
        message: "Department List",
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
