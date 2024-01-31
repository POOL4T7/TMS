import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface AuthState {
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
}

// Define the initial state using that type
const initialState: AuthState = {
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
};

export const counterSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: () => initialState,
    login:(state, payload)=>{
      console.log("reducer:---> ",state, payload);
    }
  },
});

export const { login, logout } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.login;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export default counterSlice.reducer;


