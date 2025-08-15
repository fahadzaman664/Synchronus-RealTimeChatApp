import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";
import {
  HOST,
  SIGNUP_ROUTE,
  LOGIN_ROUTE,
  GET_USER_INFO,
  UPDATE_PROFILE_ROUTE,
  ADD_PROFILE_IMAGE_ROUTE,
  REMOVE_PROFILE_IMAGE_ROUTE,
} from "@/utils/constant";

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
    getCurrentUserInfo: builder.query({
      query: () => ({
        url: GET_USER_INFO,
        method: "GET",
        credentials: "include",
      }),
      //providesTags: ["UserChange"],
    }),

    // Endpoint for user signup
    userSignUp: builder.mutation({
      query: (userData) => ({
        url: SIGNUP_ROUTE,
        method: "POST",
        body: userData,
        credentials: "include",
      }),
      //providesTags: ["UserChange"],
    }),
    userLogin: builder.mutation({
      query: (userData) => ({
        url: LOGIN_ROUTE,
        method: "POST",
        body: userData,
        credentials: "include",
      }),
      //providesTags: ["UserChange"],
    }),

    updateProfile: builder.mutation({
      query: (userData) => ({
        url: UPDATE_PROFILE_ROUTE,
        method: "POST",
        body: userData,
        credentials: "include",
      }),
      //providesTags: ["UserChange"],
    }),

    uploadProfileImage: builder.mutation({
      query: (formData) => ({
        url: ADD_PROFILE_IMAGE_ROUTE,
        method: "POST",
        body: formData,
        credentials: "include",
      }),
      //providesTags: ["UserChange"],
    }),
    removeProfileImage: builder.mutation({
      query: () => ({
        url: REMOVE_PROFILE_IMAGE_ROUTE,
        method: "DELETE",
        credentials: "include",
      }),
      //providesTags: ["UserChange"],
    }),
  }),
});

export const {
  useUserSignUpMutation,
  useUserLoginMutation,
  useGetCurrentUserInfoQuery,
  useUpdateProfileMutation,
  useUploadProfileImageMutation,
  useRemoveProfileImageMutation
} = userApi;
export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
