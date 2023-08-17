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
  const [progress, setProgress] = useState<number>(0);

  const handleVideoProgress = async () => {
    const storageProgress = await storageGetData<OnProgressData>(
      episodeProgressKey,
    );
    setProgress(storageProgress?.currentTime ?? 0);
  };

  return {
    progress,
    loadProgress: handleVideoProgress,
    progressMinutes: progress / 60,
  };
};
