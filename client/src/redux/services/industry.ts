// import { Industry } from "@/models/Industry";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";

interface Industry {
  name: string;
  _id: string;
}

interface ResponseObject {
  success: boolean;
  message: string;
  industryList: Industry[];
}

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const industryApi = createApi({
  reducerPath: "industry",

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
