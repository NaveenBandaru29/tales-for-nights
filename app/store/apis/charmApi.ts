// store/apis/charmApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './../../store';
import { PaginatedResponse, PaginationParams, Charm, CharmFormData } from '@/app/types/Charm';


export const charmApi = createApi({
    reducerPath: 'charmApi',
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
    tagTypes: ['Charm'],
    endpoints: (builder) => ({
        getCharms: builder.query<PaginatedResponse, PaginationParams>({
            query: ({ page = 1, limit = 10, query = '' }) => {
                let queryString = `/charm?page=${page}&limit=${limit}`;
                if (query) {
                    queryString += `&search=${encodeURIComponent(query)}`;
                }
                return queryString;
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ _id }) => ({ type: 'Charm' as const, id: _id })),
                        { type: 'Charm', id: 'LIST' },
                    ]
                    : [{ type: 'Charm', id: 'LIST' }],
        }),

        getCharmById: builder.query<Charm, string>({
            query: (id) => `/charm/${id}`,
            transformResponse: (response: { success: boolean; data: Charm }) => response.data,
            providesTags: (result, error, id) => [{ type: 'Charm', id }],
        }),

        createCharm: builder.mutation<Charm, CharmFormData>({
            query: (charmData) => ({
                url: '/charm',
                method: 'POST',
                body: charmData,
            }),
            transformResponse: (response: { success: boolean; data: Charm }) => response.data,
            invalidatesTags: [{ type: 'Charm', id: 'LIST' }],
        }),

        updateCharm: builder.mutation<Charm, { id: string, charmData: CharmFormData }>({
            query: ({ id, charmData }) => ({
                url: `/charm/${id}`,
                method: 'PUT',
                body: charmData,
            }),
            transformResponse: (response: { success: boolean; data: Charm }) => response.data,
            invalidatesTags: (result, error, { id }) => [
                { type: 'Charm', id },
                { type: 'Charm', id: 'LIST' },
            ],
        }),

        deleteCharm: builder.mutation<{ id: string }, string>({
            query: (id) => ({
                url: `/charm/${id}`,
                method: 'DELETE',
            }),
            transformResponse: (response: { success: boolean; data: { id: string } }) => response.data,
            invalidatesTags: (result, error, id) => [
                { type: 'Charm', id },
                { type: 'Charm', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useGetCharmsQuery,
    useGetCharmByIdQuery,
    useCreateCharmMutation,
    useUpdateCharmMutation,
    useDeleteCharmMutation,
} = charmApi;