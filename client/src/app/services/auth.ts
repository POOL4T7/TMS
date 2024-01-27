import { authApi } from "../baseApi/authApi";
import { userSignupData, userLoginData } from "../../models/users";
import { ApiResponse_Company, PostCompany } from "../../models/company";

interface UserState {
  accessToken?: string;
  user?: {
    username: string;
    email: string;
    role: "manager" | "admin" | "employee";
    firstName: string;
    lastName?: string;
    profilePicture: string;
  };
  error?: "";
}

export const authApiService = authApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<UserState, userLoginData>({
      query(user) {
        console.log("user", user);
        return {
          url: "user/signin",
          method: "POST",
          body: {
            email: user.email,
            password: user.password,
          },
        };
      },
    }),
    registartion: build.mutation<UserState, userSignupData>({
      query(user) {
        return {
          url: "user/signup",
          method: "POST",
          body: {
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        };
      },
    }),
    createCompany: build.mutation<ApiResponse_Company, PostCompany>({
      query(company) {
        return {
          url: "company/auth",
          method: "POST",
          body: company,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistartionMutation,
  useCreateCompanyMutation,
} = authApiService;
