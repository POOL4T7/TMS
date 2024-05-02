import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PostCompany } from '../../models/company';
import {
  LoginData,
  AuthResponse,
  AuthInput,
  ForgotPasswordResponse,
  ResetPasswordBody,
  ResetPasswordResponse,
} from '../../models/auth';

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_SERVER_URL}/auth/`,
});

export const authApi = createApi({
  reducerPath: 'authApi',

  baseQuery: baseQuery,

  endpoints: (build) => ({
    login: build.mutation<LoginData, Partial<AuthInput>>({
      query(user) {
        return {
          url: '/login',
          method: 'POST',
          body: {
            email: user.email,
            password: user.password,
          },
        };
      },
      transformResponse(baseQueryReturnValue: AuthResponse) {
        return baseQueryReturnValue.data;
      },
    }),
    createCompany: build.mutation<LoginData, PostCompany>({
      query(company) {
        return {
          url: '/company/create',
          method: 'POST',
          body: company,
        };
      },
      transformResponse(baseQueryReturnValue: AuthResponse) {
        return baseQueryReturnValue.data;
      },
    }),
    forgotPassword: build.mutation<ForgotPasswordResponse, string>({
      query(email) {
        return {
          url: '/forgot-password',
          method: 'POST',
          body: {
            email: email,
          },
        };
      },
    }),
    resetPassword: build.mutation<ResetPasswordResponse, ResetPasswordBody>({
      query(resetBody) {
        return {
          url: '/reset-password',
          method: 'POST',
          body: resetBody,
        };
      },
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
