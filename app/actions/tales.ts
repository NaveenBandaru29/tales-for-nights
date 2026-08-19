import { apiRequest } from '@/app/store/apis/apiClient';
import { PaginationParams, PaginatedResponse, Tale, ApiResponse, TaleFormData } from '@/app/types';

export const getAllTales = async (params: PaginationParams) => {
  const response = await apiRequest<PaginatedResponse>({
    url: '/tales',
    method: 'GET',
    params: {
      page: params.page || 1,
      limit: params.limit || 10,
      ...(params.query ? { search: params.query } : {})
    },
  });
  return response;
};

export const getTaleById = async (id: string) => {
  const response = await apiRequest<ApiResponse<Tale | Tale[]>>({
    url: `/tales/${id}`,
    method: 'GET',
  });
  return response.data as any; // Using any to match previous casting
};

export const createTale = async (taleData: TaleFormData) => {
  const response = await apiRequest<ApiResponse<Tale>>({
    url: '/tales',
    method: 'POST',
    data: taleData,
  });
  return response.data as Tale;
};

export const updateTale = async (id: string, taleData: Partial<TaleFormData>) => {
  const response = await apiRequest<ApiResponse<Tale>>({
    url: `/tales/${id}`,
    method: 'PUT',
    data: taleData,
  });
  return response.data as Tale;
};

export const deleteTale = async (id: string) => {
  const response = await apiRequest<ApiResponse<{ id: string }>>({
    url: `/tales/${id}`,
    method: 'DELETE',
  });
  return response.data;
};
