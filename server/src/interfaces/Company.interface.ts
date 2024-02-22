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

export default Company;
