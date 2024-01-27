import Company, { ICompany } from "../models/Company.model";

class CompanyService {
  async createCompany(data: ICompany): Promise<ICompany> {
    try {
      const company = await Company.create(data);
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
    companyId: string,
    data: Partial<ICompany>
  ): Promise<ICompany | null> {
    try {
      const company = await Company.findByIdAndUpdate(companyId, data, {
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
