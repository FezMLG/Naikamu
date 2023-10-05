import { useState } from 'react';

import { IAnimeListItem, Paginate } from '@aniwatch/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getAnimeSeason } from '../../../utils';
import { APIClient } from '../../APIClient';

export const useQuerySeriesList = () => {
  const apiClient = new APIClient();

  const [currentSeason] = useState(getAnimeSeason());
  const [season, setSeason] = useState(getAnimeSeason());
  const [year, setYear] = useState(new Date().getFullYear());

  const { isLoading, data, refetch, fetchNextPage, isRefetching } =
    useInfiniteQuery<Paginate<IAnimeListItem[]>>(
      ['browse', season, year],
      ({ pageParam }) =>
        apiClient.getAnimeList({
          page: pageParam,
          season: season.value,
          seasonYear: year,
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
    currentSeason,
    season,
    year,
    setSeason,
    setYear,
  };
};
