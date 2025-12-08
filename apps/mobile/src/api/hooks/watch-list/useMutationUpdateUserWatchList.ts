import { WatchStatus } from '@naikamu/shared';
import { useMutation } from '@tanstack/react-query';

import { useActiveSeriesStore } from '../../../services';
import { apiClient } from '../../APIClient';

export const useMutationUpdateUserWatchList = (
  watchStatus: WatchStatus,
  seriesId: string,
) => {
  const store = useActiveSeriesStore(state => state.actions);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await apiClient.updateUserSeriesWatchList(
        seriesId,
        watchStatus,
      );

      store.updateActiveSeries({
        watchStatus: response.status,
      });

      return response;
    },
  });

  return {
    mutation,
  };
};
