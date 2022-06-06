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
            headers: { "authorization": `Bearer ${access_token}` },
          };
        },
      }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetLoggedUserQuery } = userAuthApi;
