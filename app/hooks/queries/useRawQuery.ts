import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { PaginationParams } from '@/app/types/Raw';
import { getAllRaws, getRawById } from '@/app/actions/raw';

export const useGetRawsQuery = (params: PaginationParams) => {
  const token = useSelector((state: RootState) => state.auth.token);

  return useQuery({
    queryKey: ['raws', params],
    queryFn: () => getAllRaws(params),
  });
};

export const useGetRawByIdQuery = (id: string, options?: { skip?: boolean }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  return useQuery({
    queryKey: ['raws', id],
    queryFn: () => getRawById(id),
    enabled: !!id && !options?.skip,
  });
};
