interface Industry {
  name: string;
  _id: string;
}

interface ICompany {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface PostCompany extends ICompany {
  industry: string[];
}
export interface CompanyResponse extends ICompany {
  industry: Industry;
}

export interface ApiResponse_Company {
  success: boolean;
  data: CompanyResponse;
  message: string;
}

export interface Company {
  _id: string;
  name: string;
  industry: Industry[];
  email: string;
  status: string;
  createdAt: string;
}

export interface CompanyApiResponse {
  success: boolean;
  company: Company;
  message: string;
}

export interface CompanyPostApiResponse {
  success: boolean;
  message: string;
}

interface DashboardCount {
  totalProject: number;
  totalTeam: number;
  totalPosition: number;
  totalEmployee: number;
}

interface TeamDashboardStats {
  id: string;
  value: number;
  label: string;
}

export interface CompanyDashboardCount {
  counts: DashboardCount;
  teamStats: TeamDashboardStats[];
}

export interface CompanyDashboardCountResponse extends CompanyDashboardCount {
  success: boolean;
}
