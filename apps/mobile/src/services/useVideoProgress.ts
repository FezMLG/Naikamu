import { useState } from 'react';

import { OnProgressData } from 'react-native-video';

import { storageGetData } from '../utils';

export const createEpisodeProgressKey = (
  animeId: string,
  episodeNumber: number,
) => `${animeId}-${episodeNumber}`.toLowerCase();

/**
 * @deprecated use only for handling offline video progress, to be removed in favor of offline api requests queue
 * @param episodeProgressKey created with createEpisodeProgressKey
 */
export const useVideoProgress = (episodeProgressKey: string) => {
  const [progress, setProgress] = useState<number>(0);

  const handleVideoProgress = async () => {
    const storageProgress =
      await storageGetData<OnProgressData>(episodeProgressKey);

    setProgress(storageProgress?.currentTime ?? 0);
  };

  return {
    progress,
    loadProgress: handleVideoProgress,
    progressMinutes: progress / 60,
  };
};
