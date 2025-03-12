import { useEffect } from 'react';

import { IWatchListSeries, Paginate, WatchStatus } from '@naikamu/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useWatchListStore } from '../../../services';
import { apiClient, APIClient } from '../../APIClient';

export const useInfiniteQueryUserWatchList = () => {
  const apiClient = new APIClient();

  const filters = useWatchListStore(state => state.filters);

  const { isLoading, data, refetch, fetchNextPage, isRefetching, isError } =
    useInfiniteQuery<Paginate<IWatchListSeries[]>>({
      initialData: undefined,
      initialPageParam: undefined,
      queryKey: ['watch list'],
      queryFn: ({ pageParam: pageParameter = 1 }) =>
        apiClient.getUserWatchList({
          page: pageParameter as number,
          status: [...filters].map(([_, value]) => value as WatchStatus),
        }),
      getNextPageParam: lastPage => lastPage.pageInfo.currentPage + 1,
    });

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  return {
    api: {
      isError,
      isLoading,
      data,
      refetch,
      fetchNextPage,
      isRefetching,
    },
  };
};
