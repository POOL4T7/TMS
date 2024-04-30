import { Types } from "mongoose";

// interface Industry {
//   _id?: string;
//   name?: string;
// }

export interface ICompany {
  _id?: Types.ObjectId;
  name: string;
  industry: Types.ObjectId[];
  email: string;
  phone?: string;
  password?: string;
  status: string;
  profile?: string;
  resetToken?: string;
}

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
