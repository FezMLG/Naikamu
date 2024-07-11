import { User } from '@naikamu/shared';
import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../APIClient';

export const useQueryUser = () => {
  const { data, isError, isLoading, refetch, fetchStatus } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => apiClient.getUser(),
  });

  return {
    data,
    refetch,
    isError,
    isLoading: isLoading && fetchStatus !== 'idle',
  };
};
