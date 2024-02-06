import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { industryApi } from "./services/industry";
import { authApi } from "./services/auth";
import authReducer from "./features/authSlice";
import { companyApi } from "./services/company";
import { teamsApi } from "./services/teams";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      authState: authReducer,
      [industryApi.reducerPath]: industryApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [companyApi.reducerPath]:companyApi.reducer,
      [teamsApi.reducerPath]:teamsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(industryApi.middleware)
        .concat(authApi.middleware)
        .concat(companyApi.middleware)
        .concat(teamsApi.middleware),
    devTools: import.meta.env.NODE_ENV !== "production",
    ...options,
  });

export const store = createStore({});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
