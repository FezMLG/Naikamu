import { IUpdateWatchListEpisode } from '@naikamu/shared';
import { useMutation } from '@tanstack/react-query';

import { useActiveSeriesStore } from '../../../services';
import { apiClient } from '../../APIClient';
import { logger } from '../../../utils/logger';

export const useMutationUpdateUserSeriesWatchProgress = (
  seriesId: string,
  episodeNumber: number,
) => {
  const activeSeriesStore = useActiveSeriesStore(store => store.actions);

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
      activeSeriesStore.updateEpisode(episodeNumber, results);

      return results;
    },
    onSuccess(data) {
      console.log(data);
    },
  });

  return {
    mutation,
  };
};
