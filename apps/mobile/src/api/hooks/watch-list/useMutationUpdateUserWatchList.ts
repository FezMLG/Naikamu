import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { WatchStatus } from '../../../../../../lib/shared/dist';
import { APIClient } from '../../APIClient';

export const useMutationUpdateUserWatchList = (
  watchStatus: WatchStatus,
  seriesId: string,
) => {
  const apiClient = new APIClient();
  const [watching, setWatching] = useState<WatchStatus>(watchStatus);
  const mutation = useMutation({
    mutationFn: () => apiClient.updateUserSeriesWatchList(seriesId),
    onSuccess: data => {
      setWatching(data.status);
    },
  });

  return {
    watching,
    mutation,
  };
};
