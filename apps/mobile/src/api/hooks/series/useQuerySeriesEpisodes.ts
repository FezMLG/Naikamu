import { useQuery } from '@tanstack/react-query';

import { useActiveSeriesStore } from '../../../services';
import { apiClient } from '../../APIClient';

export const useQuerySeriesEpisodes = (
  id: string,
  numberOfAiredEpisodes: number,
) => {
  const store = useActiveSeriesStore(state => state.actions);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['anime', id, 'episodes'],
    queryFn: async () => {
      const results = await apiClient.getEpisodes(id, numberOfAiredEpisodes);

      store.setEpisodes(results.episodes);

      return results;
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};
