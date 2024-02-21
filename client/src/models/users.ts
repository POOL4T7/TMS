export interface User {
  _id:string;
  username: string;
  email: string;
  role: "manager" | "admin" | "employee";
  firstName: string;
  lastName?: string;
  profilePicture?: string;
  positionId: Position;
  teamId: Team;
  status: string;
  employeeId:string
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

interface Position {
  _id: string;
  name: string;
}

interface Team {
  _id: string;
  name: string;
}

export interface UserGetApiData {
  userList: User[];
  totalCount: number;
}

export interface UserGetApiResponse extends UserGetApiData {
  success: boolean;
  message: string;
}