import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../APIClient';

export interface IContinueWatching {
  seriesId: number;
  episodeId: number;
  episodeNumber: number;
  seriesTitle: string;
  episodeTitle: string;
  imageUrl: string;
  progress: number;
}

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
