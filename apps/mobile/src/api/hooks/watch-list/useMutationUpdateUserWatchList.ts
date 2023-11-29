import { useState } from 'react';

import { WatchStatusNew } from '@naikamu/shared';
import { useMutation } from '@tanstack/react-query';

import { APIClient } from '../../APIClient';

export const useMutationUpdateUserWatchList = (
  watchStatus: WatchStatusNew,
  seriesId: string,
) => {
  const apiClient = new APIClient();
  const [watching, setWatching] = useState<WatchStatusNew>(watchStatus);
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
