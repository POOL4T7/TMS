// controllers/UserController.ts

import { Request, Response } from 'express';
import UserService, { Filter } from '../services/User.service';
import { IUser } from '../interfaces/User.interface';
import { RequestWithSessionDetails, Sort } from '../interfaces/Custum.inteface';
import Custom from '../helpers/custom';

class UserController {
  async registerUser(req: Request, res: Response): Promise<Response> {
    try {
      const userDetails = Custom.getSessionDetails(req);
      const user: IUser = {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        employeeId: req.body.employeeId,
        departmentId: req.body.departmentId,
        positionId: req.body.positionId,
        companyId: userDetails.companyId,
        hireDate: req.body.hireDate,
        qualification: req.body.qualification,
        status: req.body.status,
      };
      await UserService.createUser(user);
      return res.status(201).json({
        success: true,
        message: 'User registred successfully',
      });
    } catch (e: any) {
      return res.status(500).json({
        success: true,
        message: 'server error',
        error: e.message,
      });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<Response> {
    try {
      const userDetails = Custom.getSessionDetails(req);
      const role = (req as RequestWithSessionDetails).sessionDetails.role;
      const updatedData: Partial<IUser> = {};
      if (role === 'user') {
        updatedData.firstName = req.body.firstName;
        updatedData.lastName = req.body.lastName;
      } else {
        updatedData.firstName = req.body.firstName;
        updatedData.lastName = req.body.lastName;
        updatedData.employeeId = req.body.employeeId;
        updatedData.departmentId = req.body.departmentId;
        updatedData.positionId = req.body.positionId;
        updatedData.hireDate = req.body.hireDate;
        updatedData.status = req.body.status;
      }
      const user: IUser | null = await UserService.updateUser(
        { companyId: userDetails.companyId, _id: req.params.userId },
        updatedData
      );
      if (!user) {
        return res.status(404).json({
          success: true,
          message: 'User not found',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
      });
    } catch (e: any) {
      return res.status(500).json({
        success: true,
        message: 'server error',
        error: e.message,
      });
    }
  }

  async getCompanyUsers(req: Request, res: Response): Promise<Response> {
    try {
      const userDetails = Custom.getSessionDetails(req);
      const page: number = parseInt(req.query.page as string) || 1;
      const pageSize: number = parseInt(req.query.pageSize as string) || 10;
      const skip = (page - 1) * pageSize;
      const orderby = req.query.orderby;
      const order = req.query.order;
      const sort: Sort = {};

      if (orderby == 'id') {
        sort['_id'] = order === 'asc' ? 1 : -1;
      } else if (orderby == 'name') {
        sort['name'] = order === 'asc' ? 1 : -1;
      } else if (orderby == 'team') {
        sort['team.name'] = order === 'asc' ? 1 : -1;
      } else if (orderby == 'totalMember') {
        sort['totalMember'] = order === 'asc' ? 1 : -1;
      } else if (orderby == 'status') {
        sort['status'] = order === 'asc' ? 1 : -1;
      }

      const users = await UserService.find(
        { companyId: userDetails.companyId },
        '-password',
        skip,
        pageSize,
        sort
      );
      return res.status(200).json(users);
    } catch (e: any) {
      return res.status(500).json({
        success: true,
        message: 'server error',
        error: e.message,
      });
    }
  }

  async filteredCompanyUser(req: Request, res: Response): Promise<Response> {
    try {
      const userDetails = Custom.getSessionDetails(req);
      const page: number = parseInt(req.query.page as string) || 1;
      const pageSize: number = parseInt(req.query.pageSize as string) || 10;
      const skip = (page - 1) * pageSize;
      const filter: Filter = {
        companyId: userDetails.companyId,
      };
      req.query.teamId
        ? (filter.departmentId = req.query.teamId.toString())
        : '';
      req.query.positionId
        ? (filter.positionId = req.query.positionId.toString())
        : '';
      req.query.employeeId
        ? (filter.employeeId = req.query.employeeId.toString())
        : '';
      req.query.role ? (filter.role = req.query.role.toString()) : '';
      const users = await UserService.find(
        filter,
        '_id firstName lastName',
        skip,
        pageSize
      );
      return res.status(200).json(users);
    } catch (e: any) {
      return res.status(500).json({
        success: true,
        message: 'server error',
        error: e.message,
      });
    }
  }
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (e: any) {
      res.status(500).json({
        success: true,
        message: 'server error',
        error: e.message,
      });
    }
  }

  async userDetails(req: Request, res: Response): Promise<Response> {
    const userId = req.params.userId;
    try {
      const user = await UserService.findOne({ _id: userId }, '-password');
      if (user) {
        return res.status(200).json({
          success: true,
          userDetails: user,
          message: 'User Details',
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
    } catch (e: any) {
      return res.status(500).json({
        success: true,
        message: 'server error',
        error: e.message,
      });
    }
  }
  async ownDetails(req: Request, res: Response): Promise<Response> {
    const userId = (req as unknown as RequestWithSessionDetails).sessionDetails
      ._id;
    try {
      const user = await UserService.findOne({ _id: userId }, '-password');
      if (user) {
        return res.status(200).json({
          success: true,
          userDetails: user,
          message: 'User Details',
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
    } catch (e: any) {
      return res.status(500).json({
        success: true,
        message: 'server error',
        error: e.message,
      });
    }
  }
}

export default new UserController();
