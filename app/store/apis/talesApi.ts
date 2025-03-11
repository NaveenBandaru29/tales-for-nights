// store/apis/talesApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Tale, TaleFormData, ApiResponse } from '../../types';
import { RootState } from '../../store';

export const talesApi = createApi({
  reducerPath: 'talesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the auth state
      const token = (getState() as RootState).auth.token;
      
      // If we have a token, add it to the headers
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  tagTypes: ['Tales', 'Tale'],
  endpoints: (builder) => ({
    getTales: builder.query<Tale[], void>({
      query: () => '/tales',
      transformResponse: (response: ApiResponse<Tale[]>) => response.data || [],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Tales' as const, id: _id })),
              { type: 'Tales', id: 'LIST' },
            ]
          : [{ type: 'Tales', id: 'LIST' }],
    }),
    
    getTaleById: builder.query<Tale, string>({
      query: (id) => `/tales/${id}`,
      transformResponse: (response: ApiResponse<Tale>) => response.data as Tale,
      providesTags: (result, error, id) => [{ type: 'Tale', id }],
    }),
    
    createTale: builder.mutation<Tale, TaleFormData>({
      query: (taleData) => ({
        url: '/tales',
        method: 'POST',
        body: taleData,
      }),
      transformResponse: (response: ApiResponse<Tale>) => response.data as Tale,
      invalidatesTags: [{ type: 'Tales', id: 'LIST' }],
    }),
    
    updateTale: builder.mutation<Tale, { id: string; taleData: Partial<TaleFormData> }>({
      query: ({ id, taleData }) => ({
        url: `/tales/${id}`,
        method: 'PUT',
        body: taleData,
      }),
      transformResponse: (response: ApiResponse<Tale>) => response.data as Tale,
      invalidatesTags: (result, error, { id }) => [
        { type: 'Tales', id: 'LIST' },
        { type: 'Tale', id },
      ],
    }),
    
    deleteTale: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/tales/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: ApiResponse<{ id: string }>) => response.data as { id: string },
      invalidatesTags: (result, error, id) => [
        { type: 'Tales', id: 'LIST' },
        { type: 'Tale', id },
      ],
    }),
  }),
});

export const {
  useGetTalesQuery,
  useGetTaleByIdQuery,
  useCreateTaleMutation,
  useUpdateTaleMutation,
  useDeleteTaleMutation,
} = talesApi;
