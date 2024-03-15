import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  HttpResponse,
  OwnProfileResponse,
  UpdateUserData,
  User,
  UserDetailsResponse,
  UserGetApiData,
  UserGetApiResponse,
} from "../../models/users";
import { ErrorType } from "../../models/custom";

interface Pagination {
  page: number;
  rowsPerPage: number;
  orderBy: string;
  order: "asc" | "desc";
}

interface Filters {
  companyId?: string;
  role?: string;
  departmentId?: string;
  positionId?: string;
  employeeId?: string;
  pageSize?: number;
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

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const userAPI = createApi({
  reducerPath: "users",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["UserList", "User"],
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
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data as ErrorType;
      },
      providesTags: ["UserList"],
    }),
    userDetails: build.query<User, string>({
      query: (id) => `${id}`,
      transformResponse: (response: UserDetailsResponse) => {
        return response.userDetails;
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data as ErrorType;
      },
      providesTags: ["User"],
    }),
    updateUser: build.mutation<HttpResponse, UpdateUserData>({
      query(formData) {
        return {
          url: `${formData._id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["UserList", "User"],
    }),
    registerUser: build.mutation<HttpResponse, UpdateUserData>({
      query(formData) {
        return {
          url: "/register",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["UserList"],
    }),
    ownProfile: build.query<User, void>({
      query: () => "/own-profile",
      transformResponse: (response: OwnProfileResponse) => {
        return response.userDetails;
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data as ErrorType;
      },
    }),
    filteredUserList: build.query<UserGetApiData, Filters>({
      query: ({
        departmentId = "",
        positionId = "",
        employeeId = "",
        role = "manager",
        pageSize = 100,
      }) =>
        `/filtered-users?teamId=${departmentId}&positionId=${positionId}&employeeId=${employeeId}&role=${role}&pageSize=${pageSize}`,
      transformResponse: (response: UserGetApiResponse) => {
        return {
          userList: response.userList,
          totalCount: response.totalCount,
        };
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data as ErrorType;
      },
    }),
  }),
});

export const {
  useUserListQuery,
  useUserDetailsQuery,
  useUpdateUserMutation,
  useRegisterUserMutation,
  useOwnProfileQuery,
  useFilteredUserListQuery,
} = userAPI;
