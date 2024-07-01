import { IWatchListImport } from '@naikamu/shared';
import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../APIClient.ts';

export const useQueryWatchListImport = () => {
  const { data, isError, isLoading, refetch, fetchStatus } =
    useQuery<IWatchListImport>({
      queryKey: ['watch-list-import'],
      queryFn: async () => {
        const response = await apiClient.watchListImport();

        console.log(response);

        return response;
      },
      enabled: false,
    });

  return {
    data,
    refetch,
    isError,
    isLoading: isLoading && fetchStatus !== 'idle',
  };
};
