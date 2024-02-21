import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {  UserGetApiData, UserGetApiResponse } from "../../models/users";

interface Pagination {
  page: number;
  rowsPerPage: number;
  orderBy: string;
  order: "asc" | "desc";
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_SERVER_URL}/user`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authState.accessToken;
    if (token) {
      headers.set("x-access-token", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

export const userAPI = createApi({
  reducerPath: "users",
  baseQuery: baseQueryWithRetry,
  endpoints: (build) => ({
    userList: build.query<UserGetApiData, Pagination>({
      query: ({ page = 1, rowsPerPage = 1, orderBy = "name", order = "asc" }) =>
        `/users-list?page=${page}&perPage=${rowsPerPage}&orderby=${orderBy}&order=${order}`,
      transformResponse: (response: UserGetApiResponse) => {
        return {
          userList: response.userList,
          totalCount: response.totalCount,
        };
      },
    }),
  }),
});

export const { useUserListQuery } = userAPI;
