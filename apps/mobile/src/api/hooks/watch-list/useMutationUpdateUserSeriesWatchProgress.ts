import { IUpdateWatchListEpisode } from '@naikamu/shared';
import { useMutation } from '@tanstack/react-query';

import { useActiveSeriesStore } from '../../../services';
import { apiClient } from '../../APIClient';

export const useMutationUpdateUserSeriesWatchProgress = (
  seriesId: string,
  episodeNumber: number,
) => {
  const activeSeriesStore = useActiveSeriesStore(store => store.actions);

  const mutation = useMutation({
    mutationFn: async (dto: IUpdateWatchListEpisode) => {
      const episode = activeSeriesStore.getEpisode(episodeNumber);

      const results = await apiClient.updateUserSeriesWatchProgress(
        seriesId,
        episodeNumber,
        {
          isWatched: dto.isWatched,
          progress: episode.progress,
        },
      );

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
