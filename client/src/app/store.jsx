import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../features/user.slice.jsx";
import userReducer from "../features/user.slice.jsx";
export const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
