import { useState } from 'react';
import { OnProgressData } from 'react-native-video';
import { storageGetData } from '../utils';

export const createEpisodeProgressKey = (
  animeId: string,
  episodeNumber: number,
) => {
  return `${animeId}-${episodeNumber}`.toLowerCase();
};

export const useVideoProgress = (episodeProgressKey: string) => {
  const [progress, setProgress] = useState<number | undefined>(undefined);

  const handleVideoProgress = async () => {
    const storageProgress = await storageGetData<OnProgressData>(
      episodeProgressKey,
    );
    console.log(storageProgress);
    setProgress(storageProgress?.currentTime);
  };

  return {
    progress,
    loadProgress: handleVideoProgress,
  };
};
