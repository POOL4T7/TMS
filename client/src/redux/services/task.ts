import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
  retry,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import {
  TaskGetApiResponse,
  TaskGetApiData,
  ReturnObject,
  Task,
} from '../../models/Task';
import { ErrorType } from '../../models/custom';

// interface Pagination {
//   page: number;
//   rowsPerPage: number;
//   orderBy: string;
//   order: 'asc' | 'desc';
//   teamId?: string;
// }

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_SERVER_URL}/task`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authState.accessToken;
    if (token) {
      headers.set('x-access-token', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const taskAPI = createApi({
  reducerPath: 'Task',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['task-list'],
  endpoints: (build) => ({
    assignedTask: build.query<TaskGetApiData, void>({
      query: () => `/get-own-task`,
      transformResponse: (response: TaskGetApiResponse) => {
        return {
          taskList: response.taskList,
          totalTask: response.totalTask,
        };
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data as ErrorType;
      },
      providesTags: ['task-list'],
    }),
    updateTask: build.mutation<ReturnObject, Partial<Task>>({
      query(data) {
        return {
          url: `/update-task/${data._id}`,
          method: 'PATCH',
          body: data,
        };
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data as ErrorType;
      },
      invalidatesTags: ['task-list'],
    }),
  }),
});

export const { useAssignedTaskQuery, useUpdateTaskMutation } = taskAPI;
