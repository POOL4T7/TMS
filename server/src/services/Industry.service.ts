import { Sort } from "../interfaces/Custum.inteface";
import Industry from "../models/Industry.model";
import IIndustry from "../interfaces/Industry.interface";
import RedisService from "./RedisService.service";

interface Filter {
  status?: string;
  slug?: string;
}

class IndustryService {
  async createIndustry(data: IIndustry): Promise<IIndustry> {
    try {
      const industry = await Industry.create(data);
      return industry;
    } catch (error: any) {
      throw new Error(`Error creating industry: ${error.message}`);
    }
  }
  static async createManyIndustry(data: IIndustry[]): Promise<IIndustry[]> {
    try {
      const industry = await Industry.insertMany(data);
      return industry;
    } catch (error: any) {
      throw new Error(`Error creating industry: ${error.message}`);
    }
  }

  async getIndustryById(industryId: string): Promise<IIndustry | null> {
    try {
      const industry = await Industry.findById(industryId);
      return industry;
    } catch (error: any) {
      throw new Error(`Error getting industry: ${error.message}`);
    }
  }

  async updateIndustry(
    industryId: string,
    data: Partial<IIndustry>
  ): Promise<IIndustry | null> {
    try {
      const industry = await Industry.findByIdAndUpdate(industryId, data, {
        new: true,
      });
      return industry;
    } catch (error: any) {
      throw new Error(`Error updating industry: ${error.message}`);
    }
  }

  async deleteIndustry(industryId: string): Promise<void> {
    try {
      await Industry.findByIdAndDelete(industryId);
    } catch (error: any) {
      throw new Error(`Error deleting industry: ${error.message}`);
    }
  }

  async getAllIndustries(
    filter: Filter = {},
    select: string = "_id name",
    sort: Sort = {},
    skip: number = 0,
    limit: number = 0
  ): Promise<IIndustry[]> {
    try {
      let industries = [];
      let fromRedis = false;
      const redisEnabled = process.env.REDIS_INDUSTRY_LIST === "ON";

      const client = RedisService.getInstance();
      if (redisEnabled) {
        const value = await client?.get("industryList");
        if (value) {
          console.log("from cached");
          industries = JSON.parse(value);
          fromRedis = true;
        }
      }

      if (!fromRedis) {
        industries = await Industry.find(filter)
          .select(select)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .lean();
        if (redisEnabled) {
          await client?.set("industryList", JSON.stringify(industries));
        }
      }
      return industries;
    } catch (error: any) {
      console.log(error);
      throw new Error(`Error getting industries: ${error.message}`);
    }
  }
}

export default IndustryService;
