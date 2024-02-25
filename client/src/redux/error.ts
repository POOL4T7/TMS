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
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isFulfilled(action)) {
    console.log("Action fulfilled:", action);
    if ((action?.payload as Payload)?.message)
      toast.success((action?.payload as Payload)?.message);
  }
  if (isRejectedWithValue(action)) {
    console.warn("We got a rejected action!");
    toast.warn(
      (action?.payload as Payload).data.message || action.error.message
    );
  }
  return next(action);
};
