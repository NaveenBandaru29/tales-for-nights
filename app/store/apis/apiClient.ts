// utils/apiClient.ts
import axios, { AxiosRequestConfig, Method } from 'axios';

interface APIRequestOptions<T = any> {
    url: string;
    method: Method;

    data?: T; // For POST/PUT
    params?: Record<string, any>; // For GET queries
    headers?: Record<string, string>; // Custom headers
}

export async function apiRequest<TResponse = any, TData = any>({
    url,
    method,
    data,
    params,
    headers = {},
}: APIRequestOptions<TData>): Promise<TResponse> {
    const apiUrl = '/api' + url
    
    let authToken = null;
    if (typeof window !== 'undefined') {
        authToken = localStorage.getItem('token');
    }

    try {
        const config: AxiosRequestConfig = {
            url: apiUrl,
            method,
            params,
            data,
            headers: {
                ...headers,
                ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
                'Content-Type': 'application/json',
            },
        };

        const response = await axios(config);
        return response.data;
    } catch (err: any) {
        const errorMessage =
            err.response?.data?.message || err.message || 'Unknown API error';
        throw new Error(errorMessage);
    }
}
