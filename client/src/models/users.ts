export interface User {
  username: string;
  email: string;
  role: "manager" | "admin" | "employee";
  firstName: string;
  lastName?: string;
  profilePicture: string;
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
