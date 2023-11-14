import { useState } from 'react';

import { OnProgressData } from 'react-native-video';

import { storageGetData, storageStoreData } from '../../utils';

export const createEpisodeProgressKey = (
  animeId: string,
  episodeNumber: number,
) => `${animeId}-${episodeNumber}`.toLowerCase();

export const useVideoProgress = (episodeProgressKey: string) => {
  const [progress, setProgress] = useState<number>(0);

  const handleGetVideoProgress = async () => {
    const storageProgress =
      await storageGetData<OnProgressData>(episodeProgressKey);

    setProgress(storageProgress?.currentTime ?? 0);

    return storageProgress;
  };

  const handleSaveVideoProgress = async (progressToSave: OnProgressData) => {
    if (Math.round(progressToSave.currentTime) % 5 === 0) {
      await storageStoreData(episodeProgressKey, progressToSave);
    }
  };

  return {
    progress,
    loadProgress: handleGetVideoProgress,
    progressMinutes: progress / 60,
    handleSaveVideoProgress,
  };
};
