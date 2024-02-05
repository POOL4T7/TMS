// controllers/CompanyController.ts

import { Request, Response } from "express";
import { Schema } from "mongoose";
import CompanyService from "../services/Company.service";
import TokenService from "../services/Token.service";
import DepartmentService from "../services/Department.service";

interface TokenOutput {
  _id?: string;
  email?: string;
  userId?: string;
  role?: string;
}

interface RequestWithSessionDetails extends Request {
  sessionDetails: TokenOutput;
}

class DepartmentController {
  private Company;
  private Token;
  private Department;
  constructor() {
    this.Company = new CompanyService();
    this.Token = new TokenService("");
    this.Department = new DepartmentService();
    this.updateCompanyDetails = this.updateCompanyDetails.bind(this);
    this.getDepartments = this.getDepartments.bind(this);
  }
  async createDepartment(req: Request, res: Response): Promise<Response> {
    try {
      const companyId = (req as RequestWithSessionDetails).sessionDetails._id;
      const body = {
        name: req.body.name,
        slug: req.body.slug,
        companyId: new Schema.Types.ObjectId(companyId!),
        status: req.body.status,
        image: req.body.image,
      };
      const department = await this.Department.createDepartment(body);
      console.log('department', department)
      return res.status(201).json({
        success: true,
        message: "Department created successfully",
      });
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }
  async getDepartments(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const companyId = (req as RequestWithSessionDetails).sessionDetails._id;
      const departments = await this.Department.find(
        { companyId: companyId },
        "",
        0,
        10
      );
      return res.json({
        success: true,
        teamList: departments,
        message: "Company Department List",
      });
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }

  async getIndustryById(req: Request, res: Response): Promise<Response> {
    const industryId = req.params.id;
    try {
      const industry = await this.Company.getCompanyById(industryId);
      if (industry) {
        return res.json(industry);
      } else {
        return res.status(404).json({ error: "Company not found" });
      }
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }

  async updateCompanyDetails(req: Request, res: Response): Promise<Response> {
    const companyId = (req as RequestWithSessionDetails).sessionDetails._id;
    const departmentData = {
      name: req.body.name,
      industry: req.body.industry,
    };
    try {
      const updatedCompany = await this.Company.updateCompany(
        { _id: companyId },
        departmentData
      );
      if (updatedCompany) {
        return res.status(200).json({
          success: true,
          message: "Company Updated successfully",
        });
      } else {
        return res.status(404).json({ error: "Company not found" });
      }
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }

  async deleteIndustry(req: Request, res: Response): Promise<Response> {
    const industryId = req.params.id;
    try {
      await this.Company.deleteCompany(industryId);
      return res.status(204).send(); // No content
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
