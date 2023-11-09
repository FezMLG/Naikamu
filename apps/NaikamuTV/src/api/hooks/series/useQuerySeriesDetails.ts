import { AnimeDetails, AnimeSource } from '@naikamu/shared';
import { useQuery } from '@tanstack/react-query';

import { useSelectedSeriesStore } from '../../../services';
import { APIClient } from '../../APIClient';

export const useQuerySeriesDetails = () => {
  const apiClient = new APIClient();
  const store = useSelectedSeriesStore(state => state.series);
  const actions = useSelectedSeriesStore(state => state.actions);

  const source =
    typeof store?.animeId === 'string'
      ? AnimeSource.Local
      : AnimeSource.AniList;

  const { data, isError, isLoading, refetch } = useQuery<AnimeDetails>({
    queryKey: ['anime', store?.id, 'details'],
    queryFn: async () => {
      const response = await apiClient.getAnimeDetails(store!.animeId, source);

      actions.setDetails(response);

      return response;
    },
    enabled: !!store?.id,
  });

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};
