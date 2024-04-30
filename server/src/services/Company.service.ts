import {
  CompanyPaginationData,
  DashboardCount,
} from "../interfaces/Company.interface";
import { Sort } from "../interfaces/Custum.inteface";
import Company from "../models/Company.model";
import ProjectService from "./Project.service";
import UserService from "./User.service";
import DepartmentService from "./Department.service";
import PositionService from "./Position.service";
import Logger from "../helpers/Logger";
import { ICompany } from "../interfaces/Company.interface";

interface Filter {
  _id?: string;
  email?: string;
  resetToken?: string;
}

class CompanyService {
  static async create(data: ICompany): Promise<ICompany> {
    try {
      const company = await Company.create(data);
      return company;
    } catch (error: any) {
      Logger.error(error);
      throw new Error(`Error creating company: ${error.message}`);
    }
  }
  static async findOne(filter: Filter): Promise<ICompany | null> {
    try {
      const company = await Company.findOne(filter)
        .populate({ path: "industry", select: "name" })
        .lean();
      return company;
    } catch (error: any) {
      throw new Error(`Error creating company: ${error.message}`);
    }
  }

  static async getCompanyById(companyId: string): Promise<ICompany | null> {
    try {
      const company = await Company.findById(companyId);
      return company;
    } catch (error: any) {
      throw new Error(`Error getting company: ${error.message}`);
    }
  }

  static async find(
    filter: Filter,
    select: string = "",
    skip: number = 0,
    limit: number = 10,
    sort: Sort = { _id: -1 },
  ): Promise<CompanyPaginationData | null> {
    try {
      const companyList = await Company.find(filter)
        .populate({ path: "industry", select: "name" })
        .select(select)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
      const totalCount = await Company.countDocuments(filter);
      return { companyList: companyList, totalPosition: totalCount };
    } catch (error: any) {
      throw new Error(`Error getting position: ${error.message}`);
    }
  }

  static async updateCompany(
    filter: Filter,
    data: Partial<ICompany>,
  ): Promise<ICompany | null> {
    try {
      const company = await Company.findByIdAndUpdate(filter, data, {
        new: true,
      });
      return company;
    } catch (error: any) {
      throw new Error(`Error updating company: ${error.message}`);
    }
  }

  static async deleteCompany(companyId: string): Promise<void> {
    try {
      await Company.findByIdAndDelete(companyId);
    } catch (error: any) {
      throw new Error(`Error deleting company: ${error.message}`);
    }
  }

  static async getAllCompanies(): Promise<ICompany[]> {
    try {
      const companies = await Company.find();
      return companies;
    } catch (error: any) {
      throw new Error(`Error getting companies: ${error.message}`);
    }
  }
  static async dashboardTotalCount(companyId: string): Promise<DashboardCount> {
    try {
      const totalProject = await ProjectService.countDocuments({
        owner: companyId,
      });
      const totalPosition = await PositionService.countDocuments({
        companyId: companyId,
      });
      const totalTeam = await DepartmentService.countDocuments({
        companyId: companyId,
      });
      const totalEmployee = await UserService.countDocuments({
        companyId: companyId,
      });
      return {
        totalEmployee,
        totalPosition,
        totalProject,
        totalTeam,
      };
    } catch (error: any) {
      throw new Error(`Error deleting company: ${error.message}`);
    }
  }

  // ----------------------DS---------------------
  static async updatePassword(
      filter: Filter,
      data: Partial<ICompany>,
  ): Promise<ICompany | null> {
    try {
      const company = await Company.findOneAndUpdate(filter, data, { new: true });
      return company;
    } catch (error: any) {
      throw new Error(`Error updating company's password: ${error.message}`);
    }
  }
}

export default CompanyService;
