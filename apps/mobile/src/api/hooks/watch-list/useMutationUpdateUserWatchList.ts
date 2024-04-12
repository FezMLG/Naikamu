import { useState } from 'react';

import { WatchStatus } from '@naikamu/shared';
import { useMutation } from '@tanstack/react-query';

import { APIClient } from '../../APIClient';

export const useMutationUpdateUserWatchList = (
  watchStatus: WatchStatus,
  seriesId: string,
) => {
  const apiClient = new APIClient();
  const [watching, setWatching] = useState<WatchStatus>(watchStatus);
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await apiClient.updateUserSeriesWatchList(
        seriesId,
        watchStatus,
      );

      setWatching(response.status);

      return response;
    },
  });

  return {
    watching,
    mutation,
  };
};
