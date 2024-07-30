import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { FileUpload } from "@/models/custom";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_SERVER_URL}/custom`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authState.accessToken;
    if (token) {
      headers.set("x-access-token", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const customAPI = createApi({
  reducerPath: "custom",
  baseQuery: baseQueryWithRetry,
  endpoints: (build) => ({
    uploadImage: build.mutation<FileUpload, FormData>({
      query(data) {
        return {
          url: "/upload-image",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useUploadImageMutation } = customAPI;
