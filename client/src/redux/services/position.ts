import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  PositionGetApiData,
  PositionGetApiResponse,
} from "../../models/Position";

interface Pagination {
  page: number;
  rowsPerPage: number;
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_SERVER_URL}/position`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authState.accessToken;
    if (token) {
      headers.set("x-access-token", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

export const positionApi = createApi({
  reducerPath: "position",
  baseQuery: baseQueryWithRetry,
  endpoints: (build) => ({
    positionList: build.query<PositionGetApiData, Pagination>({
      query: ({ page = 1, rowsPerPage = 1 }) =>
        `?page=${page}&perPage=${rowsPerPage}`,
      transformResponse: (response: PositionGetApiResponse) => {
        return {
          positionList: response.positionList,
          totalPosition: response.totalPosition,
        };
      },
    }),
  }),
});

export const { usePositionListQuery } = positionApi;
