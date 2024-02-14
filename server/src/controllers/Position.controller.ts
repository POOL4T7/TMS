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

const waitFiveSeconds = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Operation completed after 5 seconds");
    }, 5000);
  });
};
interface Sort {
  [key: string]: 1 | -1;
}

class PositionController {
  constructor() {
    this.createPosition = this.createPosition.bind(this);
    this.getAllPosition = this.getAllPosition.bind(this);
  }
  async getAllPosition(req: Request, res: Response): Promise<Response> {
    try {
      // await waitFiveSeconds();
      const companyId = new Types.ObjectId(
        (req as RequestWithSessionDetails).sessionDetails._id!
      ) as unknown as ObjectId;
      const page: number = parseInt(req.query.page as string) || 1;
      const pageSize: number = parseInt(req.query.pageSize as string) || 10;
      const skip = (page - 1) * pageSize;
      const orderby = req.query.orderby;
      const order = req.query.order;
      const sort: Sort = {};
      if (orderby == "id") {
        sort["_id"] = order === "asc" ? 1 : -1;
      } else if (orderby == "name") sort["name"] = order === "asc" ? 1 : -1;
      else if(orderby=="team") sort['team.name']=order ==="asc" ? 1:-1;
      else if(orderby=="totalMember") sort['totalMember']=order ==="asc" ? 1:-1;
      else if(orderby=="status") sort['status']=order ==="asc" ? 1:-1;
      const data = await PositionService.findWithStats(
        {
          companyId,
        },
        "",
        skip,
        pageSize,
        sort
      );
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
    // await waitFiveSeconds();
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

  async deletePosition(req: Request, res: Response): Promise<Response> {
    try {
      const companyId = new Types.ObjectId(
        (req as RequestWithSessionDetails).sessionDetails._id!
      ) as unknown as ObjectId;

      await PositionService.deletePosition({
        _id: req.body.positionId,
        companyId: companyId,
      });

      return res.status(200).json({
        success: true,
        message: "Position deleted",
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
