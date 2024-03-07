// controllers/CompanyController.ts

import { Request, Response } from "express";
import { Types, ObjectId } from "mongoose";
import DepartmentService from "../services/Department.service";
import Custom from "../helpers/custom";

class DepartmentController {
  constructor() {
    // this.Department = new DepartmentService();
    this.getDepartments = this.getDepartments.bind(this);
    this.createDepartment = this.createDepartment.bind(this);
  }
  async createDepartment(req: Request, res: Response): Promise<Response> {
    try {
      const userDetails = Custom.getSessionDetails(req);
      const body = {
        name: req.body.name,
        slug: req.body.slug,
        companyId: new Types.ObjectId(userDetails.companyId),
        status: req.body.status,
        image: req.body.image,
      };
      await DepartmentService.createDepartment(body);
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
      const userDetails = Custom.getSessionDetails(req);
      const departments = await DepartmentService.departmentListWithStats(
        {
          companyId: new Types.ObjectId(
            userDetails.companyId,
          ) as unknown as ObjectId,
        }, // need thinking
        0,
        10,
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
      const userDetails = Custom.getSessionDetails(req);

      const departments = await DepartmentService.findAll(
        { companyId: userDetails.companyId, status: "active" },
        "name",
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
  async uploadImage(req: Request, res: Response): Promise<Response> {
    try {
      if (req.file instanceof Error) {
        return res.status(422).json({
          success: 0,
          message: "Violation for file validation ",
          error: req.file.message,
        });
      } else {
        return res.status(200).json({
          success: 1,
          message: "File Uploaded successfully",
          fileLocation: "http://localhost:8080/" + req.file?.path,
        });
      }
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: error.message,
        message: "Server error",
      });
    }
  }
}

export default new DepartmentController();
