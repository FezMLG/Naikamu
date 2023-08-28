import { WatchList } from '@aniwatch/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

import { APIClient } from '../../APIClient';

export const useInfiniteQueryUserWatchList = () => {
  const apiClient = new APIClient();

  const { isLoading, data, refetch, fetchNextPage, isRefetching } =
    useInfiniteQuery<WatchList>(
      ['watch list'],
      ({ pageParam }) =>
        apiClient.getUserWatchList({
          page: pageParam,
        }),
      {
        getNextPageParam: lastPage => lastPage.Page.pageInfo.currentPage + 1,
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
