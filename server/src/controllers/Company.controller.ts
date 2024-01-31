// controllers/CompanyController.ts

import { Request, Response } from "express";
import CompanyService from "../services/Company.service";
// import ICompany from "../models/Company.model";
import TokenService from "../services/Token.service";

class CompanyController {
  private Company;
  private Token;
  constructor() {
    this.Company = new CompanyService();
    this.Token = new TokenService("");
    this.createCompany = this.createCompany.bind(this);
  }
  async getAllIndustries(req: Request, res: Response): Promise<Response> {
    try {
      const industries = await this.Company.getAllCompanies();
      return res.json(industries);
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

  async createCompany(req: Request, res: Response): Promise<Response> {
    try {
      const domain = req.body.email.split("@")[1];
      // integrate the domain verification
      const body = {
        name: req.body.name,
        industry: req.body.industry,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        status: req.body.status,
      };
      const company = await this.Company.create(body);
      company.password = "";
      const accessToken = this.Token.generateToken({
        email: body.email,
        _id: company._id?.toString(),
      });
      return res.status(201).json({
        success: true,
        data: {
          accessToken: accessToken,
          type: "company",
          status: company.status,
        },
        message: "New Company created",
      });
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }

  async updateIndustry(req: Request, res: Response): Promise<Response> {
    const industryId = req.params.id;
    const industryData = req.body;
    try {
      const updatedIndustry = await this.Company.updateCompany(
        industryId,
        industryData
      );
      if (updatedIndustry) {
        return res.json(updatedIndustry);
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

export default new CompanyController();
