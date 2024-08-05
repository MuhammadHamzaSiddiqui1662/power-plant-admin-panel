import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import logger from "redux-logger";
import saleDeedSlice from "../features/saleDeed/saleDeedSlice";
import ipSlice from "../features/ip/ipSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    saleDeed: saleDeedSlice,
    ip: ipSlice,
  },
  // @ts-ignore
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
