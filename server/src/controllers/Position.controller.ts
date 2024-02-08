// controllers/PositionController.ts

import { Request, Response } from "express";
import PositionService from "../services/Position.service";
import { IPosition } from "../models/Position.model";
import { ObjectId, Types } from "mongoose";

interface TokenOutput {
  _id?: string;
  email?: string;
  userId?: string;
  role?: string;
}

interface RequestWithSessionDetails extends Request {
  sessionDetails: TokenOutput;
}

class PositionController {
  constructor() {
    this.createPosition = this.createPosition.bind(this);
    this.getAllPosition = this.getAllPosition.bind(this);
  }
  async getAllPosition(req: Request, res: Response): Promise<Response> {
    try {
      const companyId = new Types.ObjectId(
        (req as RequestWithSessionDetails).sessionDetails._id!
      ) as unknown as ObjectId;

      const data = await PositionService.findWithStats({
        companyId,
      });
      return res.json({
        success: true,
        positionList: data?.positionList,
        totalPosition: data?.totalPosition,
        message: "Position list",
      });
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }

  async createPosition(req: Request, res: Response): Promise<Response> {
    const positionData: IPosition = {
      name: req.body.name,
      slug: req.body.slug,
      createdBy: (req as RequestWithSessionDetails).sessionDetails._id!,
      teamId: req.body.teamId,
      status: req.body.status,
      companyId: req.body.companyId,
    };
    try {
      const position = await PositionService.createPosition(positionData);
      return res.status(201).json({
        success: true,
        position: position,
        message: "New Position created",
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

export default new PositionController();
