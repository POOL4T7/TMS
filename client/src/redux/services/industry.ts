import { Industry } from "../../models/industry";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";

interface ResponseObject {
  success: boolean;
  message: string;
  industryList: Industry[];
}

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/",
  // prepareHeaders: (headers, { getState }) => {
  //   console.log(getState() as RootState);
  //   const token = (getState() as RootState);
  //   console.log('token', token)
  //   if (token) {
  //     headers.set("authentication", `Bearer ${token}`);
  //   }
  //   return headers;
  // },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const industryApi = createApi({
  reducerPath: "api",

  baseQuery: baseQueryWithRetry,
  endpoints: (build) => ({
    industryList: build.query<Industry[], void>({
      query: () => `tms/industry`,
      transformResponse: (response: ResponseObject) => {
        const responseData = response.industryList;
        return responseData;
      },
      // transformErrorResponse: (response, meta, arg) =>{
      //   return response.error;
      // }
    }),
  }),
});

export const { useIndustryListQuery } = industryApi;
