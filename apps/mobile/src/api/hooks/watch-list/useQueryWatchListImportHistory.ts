import { IWatchListImport } from '@naikamu/shared';
import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../APIClient';

export const useQueryWatchListImportHistory = () => {
  const { data, isError, isLoading, refetch, fetchStatus } = useQuery<
    IWatchListImport[]
  >({
    queryKey: ['watch-list-import-history'],
    queryFn: async () => {
      const response = await apiClient.getUserWatchListImportHistory();

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
