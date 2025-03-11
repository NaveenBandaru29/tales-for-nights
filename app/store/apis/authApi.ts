// store/apis/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginFormData, ApiResponse } from '../../types';

export interface AuthResponse {
  user: {
    id: string;
    username: string;
    isAdmin: boolean;
  };
  token: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginFormData>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: ApiResponse<AuthResponse>) => response.data as AuthResponse,
    }),
    
    register: builder.mutation<{ id: string; username: string; isAdmin: boolean }, LoginFormData>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      transformResponse: (response: ApiResponse<{ id: string; username: string; isAdmin: boolean }>) => 
        response.data as { id: string; username: string; isAdmin: boolean },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
