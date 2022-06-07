import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/user/" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: "register/",
          method: "POST",
          body: user,
          headers: { "Content-Type": "application/json" },
        };
      },
    }),

    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: "login/",
          method: "POST",
          body: user,
          headers: { "Content-Type": "application/json" },
        };
      },
    }),

    getLoggedUser: builder.query({
      query: (access_token) => {
        return {
          url: "profile/",
          method: "GET",
          headers: { authorization: `Bearer ${access_token}` },
        };
      },
    }),

    changeUserPassword: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: "changepass/",
          method: "POST",
          body: actualData,
          headers: { authorization: `Bearer ${access_token}` },
        };
      },
    }),

    sendPasswordResetEmail: builder.mutation({
      query: (user) => {
        return {
          url: "send-pass-mail/",
          method: "POST",
          body: user,
          headers: { "Content-Type": "application/json" },
        };
      },
    }),

    resetPassword: builder.mutation({
      query: ({ actualData, id, token }) => {
        return {
          url: `/reset-pass/${id}/${token}/`,
          method: "POST",
          body: actualData,
          headers: { "Content-Type": "application/json" },
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetLoggedUserQuery,
  useChangeUserPasswordMutation,
  useSendPasswordResetEmailMutation,
  useResetPasswordMutation,
} = userAuthApi;
