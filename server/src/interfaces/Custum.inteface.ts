import ICompany from "./Company.interface";
import IPosition from "./Position.interface";

export interface TokenOutput {
  _id?: string;
  email?: string;
  userId?: string;
  role?: string;
  companyId?: string;
}

export interface TokenInput {
  _id?: string;
  email?: string;
  userId?: string;
  role?: string;
  companyId?: string;
}

export interface RequestWithSessionDetails extends Request {
  sessionDetails: TokenOutput;
}

export interface Sort {
  [key: string]: 1 | -1;
}

export interface PaginationData {
  positionList: IPosition[];
  totalPosition: number;
}

export interface CompanyPaginationData {
  companyList: ICompany[];
  totalPosition: number;
}
