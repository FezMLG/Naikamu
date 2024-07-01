import { User } from '@naikamu/shared';
import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../APIClient.ts';

export const useQueryUser = () => {
  const { data, isError, isLoading, refetch, fetchStatus } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await apiClient.getUser();

      console.log(response);

      return response;
    },
  });

  return {
    data,
    refetch,
    isError,
    isLoading: isLoading && fetchStatus !== 'idle',
  };
};
