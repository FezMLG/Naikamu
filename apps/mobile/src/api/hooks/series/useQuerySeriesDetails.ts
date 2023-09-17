import { AnimeDetails, AnimeSource } from '@aniwatch/shared';
import { useQuery } from '@tanstack/react-query';

import { APIClient } from '../../APIClient';

export const useQuerySeriesDetails = (id: number | string) => {
  const apiClient = new APIClient();

  const source =
    typeof id === 'string' ? AnimeSource.Local : AnimeSource.AniList;

  const { data } = useQuery<AnimeDetails>(['anime', id, 'details'], () =>
    apiClient.getAnimeDetails(id, source),
  );

  return {
    data,
  };
};
