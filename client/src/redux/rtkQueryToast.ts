import { isFulfilled, isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface Data {
  message: string;
  success: boolean;
  error?: string;
}

interface Payload {
  data: Data;
  message?: string;
}

/**
 * show a toast only for mutation query
 */
export const rtkQueryToast: Middleware =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  () => (next) => (action: any) => {
    if (action?.type.includes("executeMutation")) {
      if (isFulfilled(action)) {
        const payload = action?.payload as Payload | undefined;

        if (payload?.message) {
          toast.success(payload.message);
        }
      }

      if (isRejectedWithValue(action)) {
        console.warn("We got a rejected action!");
        const payload = action?.payload as Payload | undefined;

        toast.error(payload?.data.message || action.error.message);
      }
    }
    return next(action);
  };
