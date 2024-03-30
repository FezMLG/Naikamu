import { IWatchListSeries, Paginate } from '@naikamu/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

import HomeScreenChannel from '../../../services/HomeScreenChannel';
import { apiClient } from '../../APIClient';

export const useInfiniteQueryUserWatchList = () => {
  const { isLoading, data, refetch, fetchNextPage, isRefetching, isError } =
    useInfiniteQuery<Paginate<IWatchListSeries[]>>({
      queryKey: ['watch list'],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        const response = await apiClient.getUserWatchList({
          page: pageParam as number,
          perPage: 10,
        });

        if (response.pageInfo.currentPage === 1) {
          const firstSix = response.data.slice(0, 6);

          HomeScreenChannel.populateDefaultChannel(firstSix);
        }

        return response;
      },
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
