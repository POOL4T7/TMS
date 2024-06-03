// controllers/CompanyController.ts

import { Request, Response } from 'express';
import CompanyService from '../services/Company.service';
import { RequestWithSessionDetails } from '../interfaces/Custum.inteface';
import Custom from '../helpers/custom';
import UserService from '../services/User.service';
import { Types } from 'mongoose';
import Logger from '../helpers/Logger';

class CompanyController {
  constructor() {
    this.getOwnCompany = this.getOwnCompany.bind(this);
    this.updateCompanyDetails = this.updateCompanyDetails.bind(this);
  }
  async getOwnCompany(req: Request, res: Response): Promise<Response> {
    try {
      const company = await CompanyService.findOne({
        _id: (req as unknown as RequestWithSessionDetails).sessionDetails._id,
      });
      return res.status(200).json({
        success: true,
        company: company,
        message: 'compnay details',
      });
    } catch (e: any) {
      Logger.error(`Get own company error: ${e.message}`);
      return res.status(500).json({
        success: false,
        error: e,
        message: 'server error',
      });
    }
  }
  async getAllIndustries(req: Request, res: Response): Promise<Response> {
    try {
      const industries = await CompanyService.getAllCompanies();
      return res.json(industries);
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: 'server error',
      });
    }
  }

  async getIndustryById(req: Request, res: Response): Promise<Response> {
    const industryId = req.params.id;
    try {
      const industry = await CompanyService.getCompanyById(industryId);
      if (industry) {
        return res.json(industry);
      } else {
        return res.status(404).json({ error: 'Company not found' });
      }
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: 'server error',
      });
    }
  }

  async updateCompanyDetails(req: Request, res: Response): Promise<Response> {
    const companyId = (req as unknown as RequestWithSessionDetails)
      .sessionDetails._id;
    const companyData = {
      name: req.body.name,
      industry: req.body.industry,
    };
    try {
      const updatedCompany = await CompanyService.updateCompany(
        { _id: companyId },
        companyData
      );
      if (updatedCompany) {
        return res.status(200).json({
          success: true,
          message: 'Company Updated successfully',
        });
      } else {
        return res.status(404).json({ error: 'Company not found' });
      }
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: 'server error',
      });
    }
  }

  async deleteIndustry(req: Request, res: Response): Promise<Response> {
    const industryId = req.params.id;
    try {
      await CompanyService.deleteCompany(industryId);
      return res.status(204).send(); // No content
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: 'server error',
      });
    }
  }

  async dashboardCount(req: Request, res: Response): Promise<Response> {
    try {
      const userDetails = Custom.getSessionDetails(req);
      const counts = await CompanyService.dashboardTotalCount(
        userDetails.companyId
      );
      const teamStats = await UserService.teamCountForDashboard({
        companyId: new Types.ObjectId(userDetails.companyId!),
      });
      return res.status(200).json({
        success: true,
        counts: counts,
        teamStats: teamStats,
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

export default new CompanyController();
