// import { Industry } from "../../models/industry";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// interface ResponseObject {
//   success: boolean;
//   message: string;
//   industryList: Industry[];
// }

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/company",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authState.accessToken;
    console.log('token', token)
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
    // industryList: build.query<Industry[], void>({
    //   query: () => `tms/industry`,
    //   transformResponse: (response: ResponseObject) => {
    //     const responseData = response.industryList;
    //     return responseData;
    //   },
    //   // transformErrorResponse: (response, meta, arg) =>{
    //   //   return response.error;
    //   // }
    // }),
    companyProfile: build.query<unknown, void>({
      query: () => "/company-details",
      transformResponse: (response) => {
        const responseData = response;
        return responseData;
      },
    }),
  }),
});

export const { useCompanyProfileQuery } = companyApi;
