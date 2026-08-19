import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginFormData } from '@/app/types';
import { login, register } from '@/app/actions/auth';

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginFormData) => login(credentials),
    onSuccess: () => {
      // Typically clear or invalidate relevant queries after login
      queryClient.invalidateQueries();
    },
  });
};

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: LoginFormData) => register(userData),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
