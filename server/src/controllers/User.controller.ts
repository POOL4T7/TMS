// controllers/UserController.ts

import { Request, Response } from "express";
import UserService from "../services/User.service";
import { IUser } from "../models/User.model";
import { RequestWithSessionDetails, Sort } from "../interfaces/Custum.inteface";
import { ObjectId, Types } from "mongoose";

class UserController {
  constructor() {
    this.registerUser = this.registerUser.bind(this);
  }
  async registerUser(req: Request, res: Response): Promise<Response> {
    try {
      const companyId = new Types.ObjectId(
        (req as unknown as RequestWithSessionDetails).sessionDetails.companyId!,
      ) as unknown as ObjectId;
      const user: IUser = {
        email: req.body.email,
        password: req.body.password, // need to be hashed
        role: req.body.role,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        employeeId: req.body.employeeId,
        departmentId: req.body.departmentId,
        positionId: req.body.positionId,
        companyId: companyId,
        hireDate: req.body.hireDate,
        qualification: req.body.qualification,
        status: req.body.status,
      };
      await UserService.createUser(user);
      return res.status(201).json({
        success: true,
        message: "User registred successfully",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return res.status(500).json({
        success: true,
        message: "server error",
        error: e.message,
      });
    }
  }
  async completeProfile(req: Request, res: Response): Promise<Response> {
    try {
      // const updatedData: Partial<IUser> = {};
      // if (req.body.employeeId) updatedData.employeeId = req.body.employeeId;
      // if (req.body.department) updatedData.department = req.body.department;
      // if (req.body.position) updatedData.position = req.body.position;
      // if (req.body.hireDate) updatedData.hireDate = req.body.hireDate;
      // const user: IUser | null = await UserService.updateUser(req.params.id, {});
      // if (!user) {
      //   return res.status(404).json({
      //     success: true,
      //     message: "User not found",
      //   });
      // }

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return res.status(500).json({
        success: true,
        message: "server error",
        error: e.message,
      });
    }
  }

  async getCompanyUsers(req: Request, res: Response): Promise<Response> {
    try {
      const companyId = new Types.ObjectId(
        (req as unknown as RequestWithSessionDetails).sessionDetails.companyId!,
      ) as unknown as ObjectId;
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

      const users = await UserService.find(
        { companyId: companyId },
        "-password",
        skip,
        pageSize,
        sort,
      );
      return res.status(200).json(users);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    try {
      const user = await UserService.getUserById(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
