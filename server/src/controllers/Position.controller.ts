// controllers/PositionController.ts

import { Request, Response } from "express";
import PositionService from "../services/Position.service";
import { IPosition } from "../interfaces/Position.interface";
import { Sort } from "../interfaces/Custum.inteface";
import Custom from "../helpers/custom";

interface FormData {
  name?: string;
  status?: string;
  teamId?: string;
  slug?: string;
}

// const waitFiveSeconds = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Operation completed after 5 seconds");
//     }, 5000);
//   });
// };

class PositionController {
  constructor() {
    this.createPosition = this.createPosition.bind(this);
    this.getPositionWithStats = this.getPositionWithStats.bind(this);
    this.getPositionByDepartmentId = this.getPositionByDepartmentId.bind(this);
  }
  async getPositionWithStats(req: Request, res: Response): Promise<Response> {
    try {
      const userDetails = Custom.getSessionDetails(req);
      const page: number = parseInt(req.query.page as string) || 1;
      const pageSize: number = parseInt(req.query.perPage as string) || 10;
      const skip = (page - 1) * pageSize;
      const orderby = req.query.orderby;
      const order = req.query.order;
      const sort: Sort = {};
      if (orderby == "id") {
        sort["_id"] = order === "asc" ? 1 : -1;
      } else if (orderby == "name") {
        sort["name"] = order === "asc" ? 1 : -1;
      } else if (orderby == "team") {
        sort["team.name"] = order === "asc" ? 1 : -1;
      } else if (orderby == "totalMember") {
        sort["totalMember"] = order === "asc" ? 1 : -1;
      } else if (orderby == "status") {
        sort["status"] = order === "asc" ? 1 : -1;
      }
      const data = await PositionService.findWithStats(
        {
          companyId: Custom.toObjectId(userDetails.companyId),
        },
        skip,
        pageSize,
        sort,
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
  async getPositionByDepartmentId(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const userDetails = Custom.getSessionDetails(req);
      const page: number = parseInt(req.query.page as string) || 1;
      const pageSize: number = parseInt(req.query.pageSize as string) || 10;
      const skip = (page - 1) * pageSize;
      const orderby = req.query.orderby;
      const order = req.query.order;
      const sort: Sort = {};
      if (orderby == "id") {
        sort["_id"] = order === "asc" ? 1 : -1;
      } else if (orderby == "name") {
        sort["name"] = order === "asc" ? 1 : -1;
      } else if (orderby == "team") {
        sort["team.name"] = order === "asc" ? 1 : -1;
      } else if (orderby == "totalMember") {
        sort["totalMember"] = order === "asc" ? 1 : -1;
      } else if (orderby == "status") {
        sort["status"] = order === "asc" ? 1 : -1;
      }
      const data = await PositionService.find(
        {
          companyId: userDetails.companyId,
          teamId: req.params.teamId,
          status: "active",
        },
        "",
        skip,
        pageSize,
        sort,
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
    const userDetails = Custom.getSessionDetails(req);
    const positionData: IPosition = {
      name: req.body.name,
      slug: req.body.slug,
      createdBy: userDetails.companyId,
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
      const userDetails = Custom.getSessionDetails(req);

      const isDeleted = await PositionService.deletePosition({
        _id: req.body.positionId,
        companyId: userDetails.companyId,
      });

      if (isDeleted) {
        return res.status(200).json({
          success: true,
          message: "Position deleted",
        });
      } else {
        return res.status(404).json({
          success: true,
          message: "Position not found",
        });
      }
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }

  async getPosition(req: Request, res: Response): Promise<Response> {
    try {
      const userDetails = Custom.getSessionDetails(req);
      const position = await PositionService.findOne({
        _id: req.params.positionId as string,
        companyId: userDetails.companyId,
      });
      return res.status(200).json({
        success: true,
        message: "Position Details",
        position,
      });
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }

  async updatePosition(req: Request, res: Response): Promise<Response> {
    try {
      const userDetails = Custom.getSessionDetails(req);

      const formData: FormData = {};

      if (req.body.status) {
        formData.status = req.body.status;
      }

      if (req.body.teamId) {
        formData.teamId = req.body.teamId;
      }

      if (req.body.name) {
        formData.name = req.body.name;
      }

      if (req.body.slug) {
        formData.slug = req.body.slug;
      }

      await PositionService.findOneAndUpdate(
        {
          _id: req.body.positionId,
          companyId: userDetails.companyId,
        },
        {
          $set: formData,
        },
      );

      return res.status(200).json({
        success: true,
        message: "Position Details Updated",
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
