import { apiRequest } from '@/app/store/apis/apiClient';
import { PaginatedResponse, PaginationParams, Raw, RawFormData } from '@/app/types/Raw';

export const getAllRaws = async (params: PaginationParams) => {
  const response = await apiRequest<PaginatedResponse>({
    url: '/raw',
    method: 'GET',
    params: {
      page: params.page || 1,
      limit: params.limit || 10,
      ...(params.query ? { search: params.query } : {})
    },
  });
  return response;
};

export const getRawById = async (id: string) => {
  const response = await apiRequest<{ success: boolean; data: Raw }>({
    url: `/raw/${id}`,
    method: 'GET',
  });
  return response.data;
};

export const createRaw = async (rawData: RawFormData) => {
  const response = await apiRequest<{ success: boolean; data: Raw }>({
    url: '/raw',
    method: 'POST',
    data: rawData,
  });
  return response.data;
};

export const updateRaw = async (id: string, rawData: Partial<RawFormData>) => {
  const response = await apiRequest<{ success: boolean; data: Raw }>({
    url: `/raw/${id}`,
    method: 'PUT',
    data: rawData,
  });
  return response.data;
};

export const deleteRaw = async (id: string) => {
  const response = await apiRequest<{ success: boolean; data: { id: string } }>({
    url: `/raw/${id}`,
    method: 'DELETE',
  });
  return response.data;
};
