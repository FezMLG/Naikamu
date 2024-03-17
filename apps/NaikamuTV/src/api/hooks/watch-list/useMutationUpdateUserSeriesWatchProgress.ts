import { IUpdateWatchListEpisode } from '@naikamu/shared';
import { useMutation } from '@tanstack/react-query';

import { useSelectedSeriesStore } from '../../../services';
import { logger } from '../../../utils';
import { apiClient } from '../../APIClient';

export const useMutationUpdateUserSeriesWatchProgress = (
  seriesId: string,
  episodeNumber: number,
) => {
  const selectedSeriesStore = useSelectedSeriesStore(store => store.actions);

  const mutation = useMutation({
    mutationFn: async (dto: IUpdateWatchListEpisode) => {
      logger('useMutationUpdateUserSeriesWatchProgress').info(dto);

      const results = await apiClient.updateUserSeriesWatchProgress(
        seriesId,
        episodeNumber,
        {
          isWatched: dto.isWatched,
          progress: dto.progress,
        },
      );

      logger('useMutationUpdateUserSeriesWatchProgress').info(results);
      selectedSeriesStore.updateEpisode(episodeNumber, results);

      return results;
    },
  });

  return {
    mutation,
  };
};
