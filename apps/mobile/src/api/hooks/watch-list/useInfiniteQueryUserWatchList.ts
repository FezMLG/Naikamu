import { IWatchListSeries, Paginate } from '@aniwatch/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

import { APIClient } from '../../APIClient';

export const useInfiniteQueryUserWatchList = () => {
  const apiClient = new APIClient();

  const { isLoading, data, refetch, fetchNextPage, isRefetching } =
    useInfiniteQuery<Paginate<IWatchListSeries[]>>(
      ['watch list'],
      ({ pageParam: pageParameter = 1 }) =>
        apiClient.getUserWatchList({
          page: pageParameter,
        }),
      {
        getNextPageParam: lastPage => lastPage.pageInfo.currentPage + 1,
      },
    );

  return {
    api: {
      isLoading,
      data,
      refetch,
      fetchNextPage,
      isRefetching,
    },
  };
};
