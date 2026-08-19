import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RawFormData } from '@/app/types/Raw';
import { createRaw, updateRaw, deleteRaw } from '@/app/actions/raw';

export const useCreateRawMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rawData: RawFormData) => createRaw(rawData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['raws'] });
    },
  });
};

export const useUpdateRawMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, rawData }: { id: string; rawData: Partial<RawFormData> }) => updateRaw(id, rawData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['raws'] });
      queryClient.invalidateQueries({ queryKey: ['raws', variables.id] });
    },
  });
};

export const useDeleteRawMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRaw(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['raws'] });
      queryClient.invalidateQueries({ queryKey: ['raws', id] });
    },
  });
};
