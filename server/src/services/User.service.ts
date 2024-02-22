import { Schema } from "mongoose";
import { Sort } from "../interfaces/Custum.inteface";
import { UserPaginationData } from "../interfaces/User.interface";
import User, { IUser } from "../models/User.model";

interface Filter {
  _id?: string;
  email?: string;
  companyId?: Schema.Types.ObjectId;
}

class UserService {
  static async createUser(data: IUser): Promise<IUser> {
    try {
      const user = await User.create(data);
      return user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  static async findOne(filter: Filter): Promise<IUser | null> {
    try {
      const company = await User.findOne(filter)
        .populate({ path: "industry", select: "name" })
        .lean();
      return company;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(`Error creating company: ${error.message}`);
    }
  }

  static async getUserById(userId: string): Promise<IUser | null> {
    try {
      const user = await User.findById(userId);
      return user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(`Error getting user: ${error.message}`);
    }
  }

  static async find(
    filter: Filter,
    select: string = "",
    skip: number = 0,
    limit: number = 10,
    sort: Sort = { _id: -1 },
  ): Promise<UserPaginationData | null> {
    try {
      const companyList = await User.find(filter)
        .populate({ path: "departmentId", select: "name" })
        .populate({ path: "positionId", select: "name" })
        .select(select)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
      const totalCount = await User.countDocuments(filter);
      return { userList: companyList, totalCount: totalCount };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(`Error getting position: ${error.message}`);
    }
  }

  static async updateUser(
    userId: string,
    data: Partial<IUser>,
  ): Promise<IUser | null> {
    try {
      const user = await User.findByIdAndUpdate(userId, data, { new: true });
      return user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  static async deleteUser(userId: string): Promise<void> {
    try {
      await User.findByIdAndDelete(userId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  static async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await User.find();
      return users;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(`Error getting users: ${error.message}`);
    }
  }
}

export default UserService;
