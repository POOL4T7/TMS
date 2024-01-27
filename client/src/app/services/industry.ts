import { api } from "../baseApi/api";
import { Industry } from "../../models/industry";

export const industryApi = api.injectEndpoints({
  endpoints: (build) => ({
    industryList: build.query<Industry[], void>({
      query: () => `tms/industry`,
    }),
  }),
});

export const { useIndustryListQuery } = industryApi;
