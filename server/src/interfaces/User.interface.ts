import { ObjectId, Types } from 'mongoose';

export interface UserCompany {
  _id: string;
  name: string;
}

export interface IUser {
  _id?: string | Types.ObjectId | ObjectId;
  username?: string;
  email: string;
  role: 'manager' | 'admin' | 'employee';
  password?: string;
  firstName: string;
  lastName?: string;
  profilePicture?: string;
  employeeId?: string;
  departmentId?: Department | ObjectId | null | undefined | string;
  positionId?: Position | ObjectId | null | undefined | string;
  hireDate?: Date;
  qualification?: string[];
  companyId?: UserCompany | ObjectId | null | undefined | string;
  status: 'active' | 'inactive' | 'deleted' | 'suspended';
  resetToken?: string | null;
}

interface Department {
  _id: string;
  name: string;
}

interface Position {
  _id: string;
  name: string;
}

export interface UserPaginationData {
  userList?: IUser[];
  totalCount: number;
}

export interface UserFilter {
  _id?: string;
  email?: string;
  companyId?: Types.ObjectId | string;
  role?: string;
  departmentId?: Types.ObjectId | string;
  positionId?: Types.ObjectId | string;
  employeeId?: string;
  status?: string;
  resetToken?: string | null;
}
