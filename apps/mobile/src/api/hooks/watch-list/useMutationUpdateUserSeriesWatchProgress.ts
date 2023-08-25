import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { APIClient } from '../../APIClient';

export const useMutationUpdateUserSeriesWatchProgress = (
  isWatched: boolean,
  seriesId: string,
  episode: number,
) => {
  const [watched, setWatched] = useState<boolean>(isWatched);
  const apiClient = new APIClient();
  const mutation = useMutation({
    mutationFn: () =>
      apiClient.updateUserSeriesWatchProgress(seriesId, episode),
    onSuccess(data) {
      setWatched(data.isWatched);
    },
  });

  return {
    watched,
    mutation,
  };
};
