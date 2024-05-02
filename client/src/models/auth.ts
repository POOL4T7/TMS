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

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordBody {
  password: string;
  resetToken: string;
}
export interface ResetPasswordResponse {
  success: false;
  message: string;
}
