import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAuthApi = createApi({
    reducerPath: "userAuthApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/user/' }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query:(user)=>{
                return {
                    url: 'register/',
                    method: 'POST',
                    body: user,
                    headers: { 'Content-Type': 'application/json' }            
                }

            }
        })
    })
});

export const { useRegisterUserMutation } =  userAuthApi;