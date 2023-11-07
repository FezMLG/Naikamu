import { useQuery } from '@tanstack/react-query';

import { APIClient } from '../../APIClient';

export const useQuerySeriesEpisodes = (
  id: string,
  numberOfAiredEpisodes: number,
) => {
  const apiClient = new APIClient();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['anime', id, 'episodes'],
    queryFn: () => apiClient.getEpisodes(id, numberOfAiredEpisodes),
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};
