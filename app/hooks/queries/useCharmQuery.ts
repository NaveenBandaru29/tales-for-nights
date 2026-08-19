import { useQuery } from '@tanstack/react-query';
import { PaginationParams } from '@/app/types/Charm';
import { getAllCharms, getCharmById } from '@/app/actions/charm';

export const useGetCharmsQuery = (params: PaginationParams) => {
  return useQuery({
    queryKey: ['charms', params],
    queryFn: () => getAllCharms(params),
  });
};

export const useGetCharmByIdQuery = (id: string, options?: { skip?: boolean }) => {
  return useQuery({
    queryKey: ['charms', id],
    queryFn: () => getCharmById(id),
    enabled: !!id && !options?.skip,
  });
};
