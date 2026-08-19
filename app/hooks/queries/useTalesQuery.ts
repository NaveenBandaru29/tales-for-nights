import { useQuery } from '@tanstack/react-query';
import { PaginationParams } from '@/app/types';
import { getAllTales, getTaleById } from '@/app/actions/tales';

export const useGetAllTalesQuery = (params: PaginationParams) => {
  return useQuery({
    queryKey: ['tales', params],
    queryFn: () => getAllTales(params),
  });
};

export const useGetTaleByIdQuery = (id: string, options?: { skip?: boolean }) => {
  return useQuery({
    queryKey: ['tales', id],
    queryFn: () => getTaleById(id),
    enabled: !!id && !options?.skip,
  });
};
