// controllers/CompanyController.ts

import { Request, Response } from "express";
import CompanyService from "../services/Company.service";
import TokenService from "../services/Token.service";

interface TokenOutput {
  _id?: string;
  email?: string;
  userId?: string;
  role?: string;
}

interface RequestWithSessionDetails extends Request {
  sessionDetails: TokenOutput;
}

class CompanyController {
  private Company;
  private Token;
  constructor() {
    this.Company = new CompanyService();
    this.Token = new TokenService("");
    this.getOwnCompany = this.getOwnCompany.bind(this);
  }
  async getOwnCompany(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const company = await this.Company.findOne({
        _id: (req as RequestWithSessionDetails).sessionDetails._id,
      });
      return res.status(200).json({
        success: true,
        company: company,
        message: "compnay details",
      });
    } catch (e: any) {
      console.log("e", e);
      return res.status(500).json({
        success: false,
        error: e,
        message: "server error",
      });
    }
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
