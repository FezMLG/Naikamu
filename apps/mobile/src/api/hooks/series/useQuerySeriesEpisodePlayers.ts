import { useQuery } from '@tanstack/react-query';

import { APIClient } from '../../APIClient';

export const useQuerySeriesEpisodePlayers = (id: string, num: number) => {
  const apiClient = new APIClient();

  const { data, refetch } = useQuery(
    ['anime', id, 'episodes', num],
    () => apiClient.getEpisodePlayers(id, num),
    {
      enabled: false,
    },
  );

  return {
    data,
    refetch,
  };
};
