export interface LoginData {
  accessToken: string;
  type: string;
  status: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: LoginData;
}

export interface AuthInput {
  email: string;
  password: string;
}
