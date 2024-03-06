import { Schema } from "mongoose";
import { Sort } from "../interfaces/Custum.inteface";
import { UserPaginationData } from "../interfaces/User.interface";
import User from "../models/User.model";
import { IUser } from "../interfaces/User.interface";

export interface Filter {
  _id?: string;
  email?: string;
  companyId?: Schema.Types.ObjectId | string;
  role?: string;
  departmentId?: Schema.Types.ObjectId | string;
  positionId?: Schema.Types.ObjectId | string;
  employeeId?: string;
}

class UserService {
  static async createUser(data: IUser): Promise<IUser | null> {
    try {
      const user = await User.create(data);
      return user;
    } catch (error: any) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  static async findOne(filter: Filter, select: string): Promise<IUser | null> {
    try {
      const user = await User.findOne(filter)
        .select(select)
        .populate({ path: "departmentId", select: "name" })
        .populate({ path: "positionId", select: "name" })
        .populate({ path: "companyId", select: "name" })
        .lean();
      return user;
    } catch (error: any) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  static async find(
    filter: Filter,
    select: string = "",
    skip: number = 0,
    limit: number = 10,
    sort: Sort = { _id: -1 }
  ): Promise<UserPaginationData> {
    try {
      const userList = await User.find(filter)
        .populate({ path: "departmentId", select: "name" })
        .populate({ path: "positionId", select: "name" })
        .populate({ path: "companyId", select: "name" })
        .select(select)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
      const totalCount = await User.countDocuments(filter);
      return { userList: userList, totalCount: totalCount };
    } catch (error: any) {
      throw new Error(`Error getting position: ${error.message}`);
    }
  }

  static async updateUser(
    filter: Filter,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    try {
      const user = await User.findByIdAndUpdate(filter, data, { new: true });
      return user;
    } catch (error: any) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  static async deleteUser(userId: string): Promise<void> {
    try {
      await User.findByIdAndDelete(userId);
    } catch (error: any) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  static async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await User.find();
      return users;
    } catch (error: any) {
      throw new Error(`Error getting users: ${error.message}`);
    }
  }
}

export default UserService;
