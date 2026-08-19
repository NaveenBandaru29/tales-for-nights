import { apiRequest } from '@/app/store/apis/apiClient';
import { PaginatedResponse, PaginationParams, Charm, CharmFormData } from '@/app/types/Charm';

export const getAllCharms = async (params: PaginationParams) => {
  const response = await apiRequest<PaginatedResponse>({
    url: '/charm',
    method: 'GET',
    params: {
      page: params.page || 1,
      limit: params.limit || 10,
      ...(params.query ? { search: params.query } : {})
    },
  });
  return response;
};

export const getCharmById = async (id: string) => {
  const response = await apiRequest<{ success: boolean; data: Charm }>({
    url: `/charm/${id}`,
    method: 'GET',
  });
  return response.data;
};

export const createCharm = async (charmData: CharmFormData) => {
  const response = await apiRequest<{ success: boolean; data: Charm }>({
    url: '/charm',
    method: 'POST',
    data: charmData,
  });
  return response.data;
};

export const updateCharm = async (id: string, charmData: Partial<CharmFormData>) => {
  const response = await apiRequest<{ success: boolean; data: Charm }>({
    url: `/charm/${id}`,
    method: 'PUT',
    data: charmData,
  });
  return response.data;
};

export const deleteCharm = async (id: string) => {
  const response = await apiRequest<{ success: boolean; data: { id: string } }>({
    url: `/charm/${id}`,
    method: 'DELETE',
  });
  return response.data;
};
