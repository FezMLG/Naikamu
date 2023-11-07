import { AnimeDetails, AnimeSource } from '@naikamu/shared';
import { useQuery } from '@tanstack/react-query';

import { useSelectedSeriesStore } from '../../../services';
import { APIClient } from '../../APIClient';

export const useQuerySeriesDetails = () => {
  const apiClient = new APIClient();
  const store = useSelectedSeriesStore(state => state.series);

  const source =
    typeof store?.animeId === 'string'
      ? AnimeSource.Local
      : AnimeSource.AniList;

  const { data, isError, isLoading, refetch } = useQuery<AnimeDetails>({
    queryKey: ['anime', store?.id, 'details'],
    queryFn: async () => apiClient.getAnimeDetails(store!.animeId, source),
    enabled: !!store?.id,
  });

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};
