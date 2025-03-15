// store/apis/rawApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './../../store';
import { PaginatedResponse, PaginationParams, Raw, RawFormData } from '@/app/types/Raw';


export const rawApi = createApi({
  reducerPath: 'rawApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      // Get token from auth state
      const token = (getState() as RootState).auth.token;
      
      // If we have a token, include it in the headers
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  tagTypes: ['Raw'],
  endpoints: (builder) => ({
    getRaws: builder.query<PaginatedResponse, PaginationParams>({
      query: ({ page = 1, limit = 10, query = '' }) => {
        let queryString = `/raw?page=${page}&limit=${limit}`;
        if (query) {
          queryString += `&search=${encodeURIComponent(query)}`;
        }
        return queryString;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: 'Raw' as const, id: _id })),
              { type: 'Raw', id: 'LIST' },
            ]
          : [{ type: 'Raw', id: 'LIST' }],
    }),
    
    getRawById: builder.query<Raw, string>({
      query: (id) => `/raw/${id}`,
      transformResponse: (response: { success: boolean; data: Raw }) => response.data,
      providesTags: (result, error, id) => [{ type: 'Raw', id }],
    }),
    
    createRaw: builder.mutation<Raw, RawFormData>({
      query: (rawData) => ({
        url: '/raw',
        method: 'POST',
        body: rawData,
      }),
      transformResponse: (response: { success: boolean; data: Raw }) => response.data,
      invalidatesTags: [{ type: 'Raw', id: 'LIST' }],
    }),
    
    updateRaw: builder.mutation<Raw, { id: string; rawData: RawFormData }>({
      query: ({ id, rawData }) => ({
        url: `/raw/${id}`,
        method: 'PUT',
        body: rawData,
      }),
      transformResponse: (response: { success: boolean; data: Raw }) => response.data,
      invalidatesTags: (result, error, { id }) => [
        { type: 'Raw', id },
        { type: 'Raw', id: 'LIST' },
      ],
    }),
    
    deleteRaw: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/raw/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { success: boolean; data: { id: string } }) => response.data,
      invalidatesTags: (result, error, id) => [
        { type: 'Raw', id },
        { type: 'Raw', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetRawsQuery,
  useGetRawByIdQuery,
  useCreateRawMutation,
  useUpdateRawMutation,
  useDeleteRawMutation,
} = rawApi;