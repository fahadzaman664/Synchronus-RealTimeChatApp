import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";
import { HOST, SIGNUP_ROUTE, LOGIN_ROUTE } from "@/utils/constant";


export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: "",
  },

  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

// This file defines the API slice for managing student data
// It includes endpoints for fetching and creating students, with caching and invalidation features.
export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: HOST,
  }),
  endpoints: (builder) => ({
    // Endpoint for user signup
    userSignUp: builder.mutation({
      query: (userData) => ({
        url: SIGNUP_ROUTE,
        method: "POST",
        body: userData,
        credentials: "include",
      }),
    }),
    userLogin: builder.mutation({
      query: (userData) => ({
        url: LOGIN_ROUTE,
        method: "POST",
        body: userData,
        credentials: "include",
      }),
    }),
  }),
});

export const { useUserSignUpMutation , useUserLoginMutation} = userApi;
export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
