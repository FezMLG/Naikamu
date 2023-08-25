import { AnimeList } from '@aniwatch/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

import { APIClient } from '../../APIClient';

export const useQuerySearchSeriesList = (phrase?: string) => {
  const apiClient = new APIClient();

  const { isLoading, data, refetch, fetchNextPage, isRefetching } =
    useInfiniteQuery<AnimeList>(
      ['search results', phrase],
      ({ pageParam }) =>
        apiClient.getAnimeList({ page: pageParam, search: phrase }),
      {
        getNextPageParam: lastPage => lastPage.Page.pageInfo.currentPage + 1,
      },
    );

  return {
    isLoading,
    data,
    refetch,
    fetchNextPage,
    isRefetching,
  };
};
