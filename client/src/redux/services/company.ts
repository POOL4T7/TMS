import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { Company, CompanyApiResponse } from "../../models/company";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/company",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authState.accessToken;
    console.log("token", token);
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
      query: () => "/company-details",
      transformResponse: (response: CompanyApiResponse) => {
        const responseData = response;
        return responseData.company;
      },
    }),
    updateCompanyDetails:build.mutation({
      query(data){
        return {
          url: "/company/login",
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response: CompanyApiResponse) => {
        const responseData = response;
        return responseData.company;
      },
    })
  }),
});

export const { useCompanyProfileQuery } = companyApi;
