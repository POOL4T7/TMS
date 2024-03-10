import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  ProjectAddData,
  ProjectGetApiData,
  ProjectGetApiResponse,
  ReturnObject,
} from "../../models/Project";
// import { toast } from "react-toastify";
import { ErrorType } from "../../models/custom";

interface Pagination {
  page: number;
  rowsPerPage: number;
  orderBy: string;
  order: "asc" | "desc";
  teamId?: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_SERVER_URL}/project`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authState.accessToken;
    if (token) {
      headers.set("x-access-token", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const projectAPI = createApi({
  reducerPath: "Project",
  baseQuery: baseQueryWithRetry,
  endpoints: (build) => ({
    projectList: build.query<ProjectGetApiData, Pagination>({
      query: ({ page = 1, rowsPerPage = 1, orderBy = "name", order = "asc" }) =>
        `?page=${page}&perPage=${rowsPerPage}&orderby=${orderBy}&order=${order}`,
      transformResponse: (response: ProjectGetApiResponse) => {
        return {
          projectList: response.projectList,
          totalProject: response.totalProject,
        };
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data as ErrorType;
      },
    }),
    createProject: build.mutation<ReturnObject, ProjectAddData>({
      query(data) {
        return {
          url: "",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useProjectListQuery, useCreateProjectMutation } = projectAPI;
