import { IWatchListSeries, Paginate } from '@naikamu/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

import TVChannel from '../../../services/TVChannel';
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
          TVChannel.populateDefaultChannel(response.data);
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
