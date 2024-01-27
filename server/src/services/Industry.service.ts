import Industry, { IIndustry } from "../models/Industry.model";

interface Filter {
  status?: string;
  slug?: string;
}

interface SortType {
  _id?: number;
  name?: number;
  displayOrder?: number;
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
    select: string = "",
    sort= {  }, // need to change
    skip: number = 0,
    limit: number = 0
  ): Promise<IIndustry[]> {
    try {
      const industries = await Industry.find(filter)
        .select(select)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
      return industries;
    } catch (error: any) {
      throw new Error(`Error getting industries: ${error.message}`);
    }
  }
}

export default IndustryService;
