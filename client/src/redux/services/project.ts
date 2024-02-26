import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  PositionAddData,
  PositionDetailsResponse,
  PositionGetApiData,
  PositionGetApiResponse,
  PositionObject,
  PositionPostData,
  PositionPostResponse,
  ReturnObject,
} from "../../models/Position";
import { toast } from "react-toastify";
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
    positionList: build.query<PositionGetApiData, Pagination>({
      query: ({ page = 1, rowsPerPage = 1, orderBy = "name", order = "asc" }) =>
        `?page=${page}&perPage=${rowsPerPage}&orderby=${orderBy}&order=${order}`,
      transformResponse: (response: PositionGetApiResponse) => {
        return {
          positionList: response.positionList,
          totalPosition: response.totalPosition,
        };
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data as ErrorType;
      },
    }),

    addPosition: build.mutation<PositionObject, PositionPostData>({
      query(data) {
        return {
          url: "",
          method: "POST",
          body: data,
        };
      },
      transformResponse(baseQueryReturnValue: PositionPostResponse) {
        toast.success("New Position added");
        return baseQueryReturnValue.position;
      },
    }),
    getPosition: build.query<PositionDetailsResponse, string>({
      query: (id) => `/${id}`,
    }),
    updatePosition: build.mutation<ReturnObject, PositionAddData>({
      query(formData) {
        return {
          url: ``,
          method: "PATCH",
          body: formData,
        };
      },

      transformResponse(baseQueryReturnValue: ReturnObject) {
        return baseQueryReturnValue;
      },
    }),
  }),
});

export const {
  usePositionListQuery,
  useAddPositionMutation,
  useGetPositionQuery,
  useUpdatePositionMutation,
} = projectAPI;
