import { AnimeDetails, AnimeSource } from '@naikamu/shared';
import { useQuery } from '@tanstack/react-query';

import { useSelectedSeriesStore } from '../../../services';
import { APIClient } from '../../APIClient';

export const useQuerySeriesDetails = (id: number | string) => {
  const apiClient = new APIClient();
  // const store = useSelectedSeriesStore(state => state.actions);

  const source =
    typeof id === 'string' ? AnimeSource.Local : AnimeSource.AniList;

  const { data, isError, isLoading, refetch } = useQuery<AnimeDetails>({
    queryKey: ['anime', id, 'details'],
    queryFn: async () => {
      // eslint-disable-next-line sonarjs/prefer-immediate-return
      const result = await apiClient.getAnimeDetails(id, source);

      // store.setSeries({
      //   id: result.id,
      //   title: result.title.romaji,
      //   episodeLength: result.duration,
      //   numOfAiredEpisodes: result.nextAiringEpisode?.episode
      //     ? result.nextAiringEpisode?.episode - 1
      //     : result.episodes ?? 12,
      //   posterUrl: result.coverImage.large,
      // });

      return result;
    },
  });

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};
