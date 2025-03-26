import { IAnimeListItem, Paginate } from '@naikamu/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

import { apiClient } from '../../APIClient';

export const useQuerySearchSeriesList = (phrase?: string) => {
  const { isLoading, data, refetch, fetchNextPage, isRefetching } =
    useInfiniteQuery<Paginate<IAnimeListItem[]>>({
      initialData: undefined,
      initialPageParam: undefined,
      queryKey: ['search results', phrase],
      queryFn: ({ pageParam }) =>
        apiClient.getAnimeList({ page: pageParam as number, search: phrase }),
      getNextPageParam: lastPage => lastPage.pageInfo.currentPage + 1,
    });

  return {
    isLoading,
    data,
    refetch,
    fetchNextPage,
    isRefetching,
  };
};
