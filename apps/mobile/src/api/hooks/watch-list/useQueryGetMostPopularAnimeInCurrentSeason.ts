import { IAnimeListItem } from '@naikamu/shared';
import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../APIClient';

export const useQueryGetMostPopularAnimeInCurrentSeason = () => {
  const query = useQuery<IAnimeListItem[]>({
    queryKey: ['anime', 'mostPopular'],
    queryFn: async () => apiClient.getMostPopularAnimeInCurrentSeason(),
  });

  return {
    ...query,
    isLoading: query.isLoading && query.fetchStatus !== 'idle',
  };
};
