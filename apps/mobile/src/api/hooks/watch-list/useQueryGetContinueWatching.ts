import { IContinueWatching } from '@naikamu/shared';
import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../APIClient';

export const useQueryGetContinueWatching = () => {
  const query = useQuery<IContinueWatching[]>({
    queryKey: ['watch-list-continue-watching'],
    queryFn: async () => apiClient.getContinueWatching(),
  });

  return {
    ...query,
    isLoading: query.isLoading && query.fetchStatus !== 'idle',
  };
};
