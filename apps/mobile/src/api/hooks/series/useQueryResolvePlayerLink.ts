import { IPlayerResponse, IResolvePlayerDto } from '@aniwatch/shared';
import { useQuery } from '@tanstack/react-query';

import { APIClient } from '../../APIClient';

export const useQueryResolvePlayerLink = (body: IResolvePlayerDto) => {
  const apiClient = new APIClient();

  const { data, isError, isLoading, refetch, fetchStatus } =
    useQuery<IPlayerResponse>({
      queryKey: ['resolve', body.url],
      queryFn: () => apiClient.resolvePlayer(body),
      enabled: false,
    });

  return {
    data,
    refetch,
    isError,
    isLoading: isLoading && fetchStatus !== 'idle',
  };
};
