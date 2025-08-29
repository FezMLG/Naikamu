import {
  IResolvePlayerDto,
  IResolvedVideoDownloadResponse,
} from '@naikamu/shared';
import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../APIClient';

export const useQueryResolveDownloadLink = (body: IResolvePlayerDto) => {
  const { data, isError, isLoading, refetch, fetchStatus } =
    useQuery<IResolvedVideoDownloadResponse>({
      queryKey: ['resolve', body.url],
      queryFn: () => apiClient.resolveDownloadPlayer(body),
      enabled: false,
    });

  return {
    data,
    refetch,
    isError,
    isLoading: isLoading && fetchStatus !== 'idle',
  };
};
