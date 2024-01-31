import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  PostCompany } from "../../models/company";

interface Data {
  accessToken: string;
  type: string;
  status: string;
}

interface AuthResponse {
  success: boolean;

  message: string;
  data: Data;
}

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/auth/",
});

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const authApi = createApi({
  /**
   * `reducerPath` is optional and will not be required by most users.
   * This is useful if you have multiple API definitions,
   * e.g. where each has a different domain, with no interaction between endpoints.
   * Otherwise, a single API definition should be used in order to support tag invalidation,
   * among other features
   */
  reducerPath: "authApi",
  /**
   * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   */
  baseQuery: baseQuery,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  //   tagTypes: ["Time", "Posts", "Counter"],
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: (build) => ({
    companyLogin: build.mutation<Data, Partial<PostCompany>>({
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
    createCompany: build.mutation<Data, PostCompany>({
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
