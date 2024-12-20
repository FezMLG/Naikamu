import { IPlayerResponse, IResolvePlayerDto } from '@naikamu/shared';
import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../APIClient';

export const useQueryResolvePlayerLink = (body: IResolvePlayerDto) => {
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
