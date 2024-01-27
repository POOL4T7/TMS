import { Industry } from "./industry";

interface ICompany {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface PostCompany extends ICompany{
    industry: string[];
}
export interface CompanyResponse extends ICompany{
    industry: Industry;
}

export interface ApiResponse_Company {
  success: boolean;
  data: CompanyResponse;
  message: string;
}
