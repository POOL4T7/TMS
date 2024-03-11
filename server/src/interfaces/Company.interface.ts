import { Types } from "mongoose";

// interface Industry {
//   _id?: string;
//   name?: string;
// }

interface Company {
  name: string;
  // industry: Industry[];
  industry?: Types.ObjectId[];
  email: string;
  phone?: string;
}

export interface CompanyPaginationData {
  companyList: Company[];
  totalPosition: number;
}

export interface DashboardCount {
  totalProject: number;
  totalTeam: number;
  totalPosition: number;
  totalEmployee: number;
}

export default Company;
