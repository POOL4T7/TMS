import { ObjectId } from "mongoose";
import Position, { IPosition } from "../models/Position.model";

interface Filter {
  _id?: string;
  companyId?: string | ObjectId;
  status?: string;
}

interface Sort {
  [key: string]: 1 | -1;
}

interface PaginationData {
  positionList: IPosition[];
  totalPosition: number;
}

class PositionService {
  static async createPosition(data: IPosition): Promise<IPosition> {
    try {
      const position = await Position.create(data);
      return position;
    } catch (error: any) {
      throw new Error(`Error creating position: ${error.message}`);
    }
  }

  static async findOne(filter: Filter): Promise<IPosition | null> {
    try {
      const position = await Position.findOne(filter)
        .populate({ path: "teamId", select: "name" })
        .lean();
      return position;
    } catch (error: any) {
      throw new Error(`Error getting position: ${error.message}`);
    }
  }

  static async find(
    filter: Filter,
    select: string = "",
    skip: number = 0,
    limit: number = 10,
    sort: Sort = { _id: -1 }
  ): Promise<PaginationData | null> {
    try {
      const position = await Position.find(filter)
        .populate({ path: "teamId", select: "name" })
        .select(select)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
      const totalCount = await Position.countDocuments(filter);
      return { positionList: position, totalPosition: totalCount };
    } catch (error: any) {
      throw new Error(`Error getting position: ${error.message}`);
    }
  }
  static async findWithStats(
    filter: Filter,
    select: string = "",
    skip: number = 0,
    limit: number = 10,
    sort: Sort = { _id: -1 }
  ): Promise<PaginationData | null> {
    try {
      const position = await Position.aggregate([
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
            foreignField: "positionId",
            as: "members",
            pipeline: [
              {
                $project: {
                  _id: 1,
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "departments",
            localField: "teamId",
            foreignField: "_id",
            as: "team",
            pipeline: [
              {
                $project: {
                  name: 1,
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: "$team",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            team: 1,
            status: 1,
            name:1,
            totalMembers: { $size: "$members" },
          },
        },
      ]);
      const totalCount = await Position.countDocuments(filter);
      return { positionList: position, totalPosition: totalCount };
    } catch (error: any) {
      throw new Error(`Error getting position: ${error.message}`);
    }
  }

  static async countPosition(filter: Filter): Promise<number> {
    try {
      const position = await Position.countDocuments(filter);
      return position;
    } catch (error: any) {
      throw new Error(`Error getting position: ${error.message}`);
    }
  }

  async updatePosition(
    positionId: string,
    data: Partial<IPosition>
  ): Promise<IPosition | null> {
    try {
      const position = await Position.findByIdAndUpdate(positionId, data, {
        new: true,
      });
      return position;
    } catch (error: any) {
      throw new Error(`Error updating position: ${error.message}`);
    }
  }

  async deletePosition(positionId: string): Promise<void> {
    try {
      await Position.findByIdAndDelete(positionId);
    } catch (error: any) {
      throw new Error(`Error deleting position: ${error.message}`);
    }
  }
}

export default PositionService;
