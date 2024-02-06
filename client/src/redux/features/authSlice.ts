import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getCookie, getSessionStorage } from "../../utils/storage";

interface AuthInitialState {
  accessToken: string;
  type: string;
  error: "";
  status: "";
  isAuthenticated: boolean;
}

const data = JSON.parse(getCookie("auth") || getSessionStorage("auth") || "{}");

const initialState: AuthInitialState = {
  type: data.type || "",
  accessToken: data.accessToken || "",
  error: "",
  status: data.status || "",
  isAuthenticated: data?.accessToken && true,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    userInfo: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.type = action.payload.type;
      state.status = action.payload.status;
      state.error = action.payload.error || "";
      state.isAuthenticated = action.payload.accessToken && true;
    },
  },
});

export const { logout, userInfo } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
