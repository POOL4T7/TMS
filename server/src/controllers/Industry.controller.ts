// controllers/IndustryController.ts

import { Request, Response } from "express";
import IndustryService from "../services/Industry.service";

class IndustryController {
  private Industry;
  constructor() {
    this.Industry = new IndustryService();
    this.createIndustry = this.createIndustry.bind(this);
    this.getAllIndustries = this.getAllIndustries.bind(this);
  }
  async getAllIndustries(req: Request, res: Response): Promise<Response> {
    try {
      const industries = await this.Industry.getAllIndustries();
      return res.status(200).json({
        success: true,
        industryList: industries,
        message: "Industries list",
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
      const industry = await this.Industry.getIndustryById(industryId);
      if (industry) {
        return res.json(industry);
      } else {
        return res.status(404).json({ error: "Industry not found" });
      }
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }

  async createIndustry(req: Request, res: Response): Promise<Response> {
    const industryData = req.body;
    try {
      const industry = await this.Industry.createIndustry(industryData);
      return res.status(201).json({
        success: true,
        data: industry,
        message: "New Industry created",
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
      const updatedIndustry = await this.Industry.updateIndustry(
        industryId,
        industryData
      );
      if (updatedIndustry) {
        return res.json(updatedIndustry);
      } else {
        return res.status(404).json({ error: "Industry not found" });
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
      await this.Industry.deleteIndustry(industryId);
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

export default new IndustryController();
