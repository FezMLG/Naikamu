import { IWatchList, Paginate } from '@aniwatch/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

import { APIClient } from '../../APIClient';

export const useInfiniteQueryUserWatchList = () => {
  const apiClient = new APIClient();

  const { isLoading, data, refetch, fetchNextPage, isRefetching } =
    useInfiniteQuery<Paginate<IWatchList>>(
      ['watch list'],
      ({ pageParam }) =>
        apiClient.getUserWatchList({
          page: pageParam,
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
