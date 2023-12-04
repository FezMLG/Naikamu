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
    mutationFn: () =>
      apiClient.updateUserSeriesWatchList(seriesId, watchStatus),
    onSuccess: data => {
      setWatching(data.status);
    },
  });

  return {
    watching,
    mutation,
  };
};
