import { AnimeDetails } from '@aniwatch/shared';
import { useQuery } from '@tanstack/react-query';

import { APIClient } from '../../APIClient';

export const useQuerySeriesDetails = (id: number) => {
  const apiClient = new APIClient();

  const { data } = useQuery<AnimeDetails>(['anime', id, 'details'], () =>
    apiClient.getAnimeDetails(id),
  );

  return {
    data,
  };
};
