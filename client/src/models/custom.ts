export interface AuthState {
  accessToken: string;
  type: string;
  status: string;
  error: string;
  isAuthenticated: boolean;
}

export interface ErrorType {
  success?: boolean;
  message: string;
  error?: string;
}
