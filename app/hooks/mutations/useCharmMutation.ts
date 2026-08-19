import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CharmFormData } from '@/app/types/Charm';
import { createCharm, updateCharm, deleteCharm } from '@/app/actions/charm';

export const useCreateCharmMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (charmData: CharmFormData) => createCharm(charmData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['charms'] });
    },
  });
};

export const useUpdateCharmMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, charmData }: { id: string; charmData: Partial<CharmFormData> }) => updateCharm(id, charmData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['charms'] });
      queryClient.invalidateQueries({ queryKey: ['charms', variables.id] });
    },
  });
};

export const useDeleteCharmMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCharm(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['charms'] });
      queryClient.invalidateQueries({ queryKey: ['charms', id] });
    },
  });
};
