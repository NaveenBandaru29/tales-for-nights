import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TaleFormData } from '@/app/types';
import { createTale, updateTale, deleteTale } from '@/app/actions/tales';

export const useCreateTaleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taleData: TaleFormData) => createTale(taleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tales'] });
    },
  });
};

export const useUpdateTaleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, taleData }: { id: string; taleData: Partial<TaleFormData> }) => updateTale(id, taleData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tales'] });
      queryClient.invalidateQueries({ queryKey: ['tales', variables.id] });
    },
  });
};

export const useDeleteTaleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTale(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['tales'] });
      queryClient.invalidateQueries({ queryKey: ['tales', id] });
    },
  });
};
