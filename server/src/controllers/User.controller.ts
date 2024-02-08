// controllers/UserController.ts

import { Request, Response } from "express";
import UserService from "../services/User.service";
import { IUser } from "../models/User.model";

class UserController {
  private User;
  constructor() {
    this.User = new UserService();
    this.registerUser = this.registerUser.bind(this);
  }
  async registerUser(req: Request, res: Response): Promise<Response> {
    try {
      const user: IUser = {
        email: req.body.email,
        password: req.body.password, // need to be hashed
        role: "employee",
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        employeeId: req.body.employeeId,
        departmentId: req.body.department,
        positionId: req.body.position,
        companyId: req.body.companyId,
        hireDate: req.body.hireDate,
        qualification: req.body.qualification,
        status: req.body.status,
      };
      const data: IUser = await this.User.createUser(user);
      return res.status(201).json({
        success: true,
        message: "User registred successfully",
        data: data,
      });
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
      // const user: IUser | null = await this.User.updateUser(req.params.id, {});
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
    } catch (e: any) {
      return res.status(500).json({
        success: true,
        message: "server error",
        error: e.message,
      });
    }
  }
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.User.getAllUsers();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    try {
      const user = await this.User.getUserById(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
