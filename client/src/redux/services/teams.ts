import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  ReturnObject,
  TeamAddData,
  TeamList,
  TeamUpdateData,
} from "@/models/Team";
import { ErrorType } from "@/models/custom";

interface ResponseObject {
  success: boolean;
  message: string;
  teamList?: TeamList[];
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_SERVER_URL}/teams`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authState.accessToken;
    if (token) {
      headers.set("x-access-token", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

export const teamsApi = createApi({
  reducerPath: "team",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["teamList"],
  endpoints: (build) => ({
    teamList: build.query<TeamList[], void>({
      query: () => `/all`,
      transformResponse: (response: ResponseObject) => {
        const responseData = response.teamList;
        return responseData!;
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data as ErrorType;
      },
      providesTags: ["teamList"],
    }),
    allTeams: build.query<TeamList[], void>({
      query: () => `/get-list`,
      transformResponse: (response: ResponseObject) => {
        const responseData = response.teamList;
        return responseData!;
      },
    }),
    createTeam: build.mutation<ReturnObject, TeamAddData>({
      query(data) {
        return {
          url: "",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["teamList"],
    }),
    updateTeam: build.mutation<ReturnObject, TeamUpdateData>({
      query(data) {
        return {
          url: `${data._id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["teamList"],
    }),
  }),
});

export const {
  useTeamListQuery,
  useAllTeamsQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
} = teamsApi;
