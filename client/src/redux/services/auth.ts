import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostCompany } from "../../models/company";
import { LoginData, AuthResponse } from "../../models/auth";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/auth/",
});

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: baseQuery,

  endpoints: (build) => ({
    companyLogin: build.mutation<LoginData, Partial<PostCompany>>({
      query(user) {
        return {
          url: "/company/login",
          method: "POST",
          body: {
            email: user.email,
            password: user.password,
          },
        };
      },
      transformResponse(baseQueryReturnValue: AuthResponse) {
        localStorage.setItem("auth", JSON.stringify(baseQueryReturnValue.data));
        return baseQueryReturnValue.data;
      },
    }),
    createCompany: build.mutation<LoginData, PostCompany>({
      query(company) {
        return {
          url: "/company/create",
          method: "POST",
          body: company,
        };
      },
      transformResponse(baseQueryReturnValue: AuthResponse) {
        localStorage.setItem("auth", JSON.stringify(baseQueryReturnValue.data));
        return baseQueryReturnValue.data;
      },
    }),
  }),
});

export const { useCreateCompanyMutation, useCompanyLoginMutation } = authApi;
