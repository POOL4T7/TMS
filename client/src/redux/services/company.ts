import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  Company,
  CompanyApiResponse,
  CompanyPostApiResponse,
  PostCompany,
} from "../../models/company";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_SERVER_URL}/company`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authState.accessToken;
    if (token) {
      headers.set("x-access-token", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const companyApi = createApi({
  reducerPath: "companyApi",

  baseQuery: baseQueryWithRetry,
  endpoints: (build) => ({
    companyProfile: build.query<Company, void>({
      query: () => "",
      transformResponse: (response: CompanyApiResponse) => {
        const responseData = response;
        return responseData.company;
      },
    }),
    updateProfile: build.mutation<CompanyPostApiResponse, Partial<PostCompany>>(
      {
        query(data) {
          return {
            url: "",
            method: "PATCH",
            body: data,
          };
        },
        transformResponse: (response: CompanyPostApiResponse) => {
          const responseData = response;
          return responseData;
        },
      }
    ),
  }),
});

export const { useCompanyProfileQuery, useUpdateProfileMutation } = companyApi;
