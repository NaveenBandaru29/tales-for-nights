import { apiRequest } from '@/app/store/apis/apiClient';
import { LoginFormData, ApiResponse } from '@/app/types';


export interface AuthResponseData {
  user: {
    id: string;
    username: string;
    isAdmin: boolean;
  };
  token: string;
}

export const login = async (credentials: LoginFormData) => {
  const response = await apiRequest<ApiResponse<AuthResponseData>>({
    url: '/auth/login',
    method: 'POST',
    data: credentials,
  });
  return response.data as AuthResponseData;
};

export const register = async (userData: LoginFormData) => {
  const response = await apiRequest<ApiResponse<{ id: string; username: string; isAdmin: boolean }>>({
    url: '/auth/register',
    method: 'POST',
    data: userData,
  });
  return response.data;
};
