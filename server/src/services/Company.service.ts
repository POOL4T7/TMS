import Company, { ICompany } from "../models/Company.model";

interface Filter {
  _id?: string;
  email?: string;
}

class CompanyService {
  async create(data: ICompany): Promise<ICompany> {
    try {
      const company = await Company.create(data);
      return company;
    } catch (error: any) {
      throw new Error(`Error creating company: ${error.message}`);
    }
  }
  async findOne(filter: Filter): Promise<ICompany | null> {
    try {
      const company = await Company.findOne(filter).populate({path:"industry", select:"name"}).lean();
      return company;
    } catch (error: any) {
      throw new Error(`Error creating company: ${error.message}`);
    }
  }

  async getCompanyById(companyId: string): Promise<ICompany | null> {
    try {
      const company = await Company.findById(companyId);
      return company;
    } catch (error: any) {
      throw new Error(`Error getting company: ${error.message}`);
    }
  }

  async updateCompany(
    filter: Filter,
    data: Partial<ICompany>
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

  async deleteCompany(companyId: string): Promise<void> {
    try {
      await Company.findByIdAndDelete(companyId);
    } catch (error: any) {
      throw new Error(`Error deleting company: ${error.message}`);
    }
  }

  async getAllCompanies(): Promise<ICompany[]> {
    try {
      const companies = await Company.find();
      return companies;
    } catch (error: any) {
      throw new Error(`Error getting companies: ${error.message}`);
    }
  }
}

export default CompanyService;
