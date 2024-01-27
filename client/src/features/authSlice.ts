import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

interface AuthInitialState {
  accessToken: string;
  user: {
    username: string;
    email: string;
    role: "manager" | "admin" | "employee";
    firstName: string;
    lastName?: string;
    profilePicture: string;
  };
  error: "";
  status: "";
  isAuthenticated: boolean;
}

const initialState: AuthInitialState = {
  user: {
    username: "",
    email: "",
    role: "employee",
    firstName: "",
    lastName: "",
    profilePicture: "",
  },
  accessToken: "",
  error: "",
  status: "",
  isAuthenticated: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
  },
//   extraReducers: (builder) => {
    // builder
    //   .addMatcher(postsApi.endpoints.login.matchPending, (state, action) => {
    //     console.log('pending', action)
    //   })
    //   .addMatcher(postsApi.endpoints.login.matchFulfilled, (state, action) => {
    //     console.log('fulfilled', action)
    //     state.user = action.payload.user
    //     state.token = action.payload.token
    //     state.isAuthenticated = true
    //   })
    //   .addMatcher(postsApi.endpoints.login.matchRejected, (state, action) => {
    //     console.log('rejected', action)
    //   })
//   },
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
