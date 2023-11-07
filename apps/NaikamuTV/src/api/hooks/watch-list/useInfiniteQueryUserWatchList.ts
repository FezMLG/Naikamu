import { IWatchListSeries, Paginate } from '@naikamu/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

import { APIClient } from '../../APIClient';

export const useInfiniteQueryUserWatchList = () => {
  const apiClient = new APIClient();

  const { isLoading, data, refetch, fetchNextPage, isRefetching, isError } =
    useInfiniteQuery<Paginate<IWatchListSeries[]>>({
      queryKey: ['watch list'],
      initialPageParam: 1,
      queryFn: ({ pageParam }) =>
        apiClient.getUserWatchList({
          page: pageParam as number,
          perPage: 10,
        }),
      getNextPageParam: lastPage => lastPage.pageInfo.currentPage + 1,
    });

  return {
    api: {
      isLoading,
      isError,
      data,
      refetch,
      fetchNextPage,
      isRefetching,
    },
  };
};
