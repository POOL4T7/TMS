import { ObjectId } from "mongoose";
import DepartmentModel, { IDepartment } from "../models/Department.model";
import { Sort } from "../interfaces/Custum.inteface";

interface Filter {
  _id?: string;
  companyId?: string | ObjectId;
}

class DepartmentService {
  static async createDepartment(data: IDepartment): Promise<IDepartment> {
    try {
      const department = await DepartmentModel.create(data);
      return department;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(`Error creating department: ${error.message}`);
    }
  }

  static async findOne(filter: Filter): Promise<IDepartment | null> {
    try {
      const department = await DepartmentModel.findOne(filter).lean();
      return department;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(`Error getting department: ${error.message}`);
    }
  }
  static async findWithPagination(
    filter: Filter,
    select: string,
    skip: number,
    limit: number,
    sort: Sort = { _id: -1 },
  ): Promise<IDepartment[] | null> {
    try {
      const departments = await DepartmentModel.find(filter)
        .select(select)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
      return departments;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(`Error getting department: ${error.message}`);
    }
  }

  async updateDepartment(
    filter: Filter,
    data: Partial<IDepartment>,
  ): Promise<IDepartment | null> {
    try {
      const department = await DepartmentModel.findByIdAndUpdate(filter, data, {
        new: true,
      });
      return department;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(`Error updating department: ${error.message}`);
    }
  }

  async deleteDepartment(filter: Filter): Promise<void> {
    try {
      await DepartmentModel.findOneAndDelete(filter);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(`Error deleting department: ${error.message}`);
    }
  }

  static async departmentListWithStats(
    filter: Filter,
    skip: number,
    limit: number,
    sort: Sort = { _id: -1 },
  ): Promise<IDepartment[] | null> {
    try {
      const departmentList = await DepartmentModel.aggregate([
        {
          $match: filter,
        },
        {
          $sort: sort,
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "departmentId",
            pipeline: [
              {
                $project: {
                  _id: 1,
                },
              },
            ],
            as: "members",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            image: 1,
            totalMembers: { $size: "$members" },
          },
        },
      ]);
      return departmentList;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(`Error getting department: ${error.message}`);
    }
  }
  static async findAll(
    filter: Filter,
    select: string,
  ): Promise<IDepartment[] | null> {
    try {
      const departmentList = await DepartmentModel.find(filter)
        .select(select)
        .lean();
      return departmentList;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(`Error getting department: ${error.message}`);
    }
  }
}

export default DepartmentService;
