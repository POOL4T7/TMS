export interface HttpResponse {
  success: boolean;
  message: string;
}

interface Position {
  _id: string;
  name: string;
}

interface Team {
  _id: string;
  name: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: "manager" | "admin" | "employee";
  firstName: string;
  lastName?: string;
  profilePicture?: string;
  positionId: Position;
  departmentId: Team;
  status: string;
  employeeId: string;
  companyId:string;
}

export interface AccessToken {
  accessToken: string;
}

export interface userLoginData {
  email: string;
  password: string;
}

export interface userSignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserGetApiData {
  userList: User[];
  totalCount: number;
}

export interface UserGetApiResponse extends HttpResponse {
  userList: User[];
  totalCount: number;
}

export interface UserDetailsResponse extends HttpResponse {
  userDetails: User;
}

export interface UpdateUserData {
  _id?: string;
  email: string;
  firstName: string;
  lastName?: string;
  profilePicture?: string;
  positionId: string;
  departmentId: string;
  status: string;
  employeeId: string;
  password?:string;
}
