import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../APIClient';

export const useQuerySeriesEpisodePlayers = (
  id: string,
  episodeNumber: number,
) => {
  const { data, refetch, isError, isLoading } = useQuery(
    ['anime', id, 'episodes', episodeNumber],
    () => apiClient.getEpisodePlayers(id, episodeNumber),
    {
      enabled: false,
    },
  );

  return {
    data,
    refetch,
    isError,
    isLoading,
  };
};
