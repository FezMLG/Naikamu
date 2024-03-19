import * as Sentry from '@sentry/react-native';
import { OnProgressData } from 'react-native-video';

import { apiClient } from '../../api/APIClient';
import { storage, storageGetData } from '../../utils';
import { logger } from '../../utils/logger';

export const sendLocalProgressToCloud = async () => {
  const allAsyncStorageEntries = storage.getAllKeys();

  const episodeKeys = allAsyncStorageEntries.filter(key =>
    key.match(/\S{24}-\d{1,5}/),
  );

  const episodeData = await Promise.allSettled(
    episodeKeys.map(async key => {
      const progress = storageGetData<OnProgressData>(key);
      const [seriesId, episodeNumber] = key.split('-');

      if (!progress) {
        throw new Error(`No data found for key ${key}`);
      }

      logger('sendLocalProgressToCloud').info(key, progress);

      let leftForWatched = 2 * 60;

      if (
        progress.seekableDuration >= 20 * 60 &&
        progress.seekableDuration < 60 * 60
      ) {
        leftForWatched = 3 * 60;
      } else if (progress.seekableDuration > 60 * 60) {
        leftForWatched = 5 * 60;
      }

      const response = await apiClient.updateUserSeriesWatchProgress(
        seriesId,
        Number(episodeNumber),
        {
          progress: progress.currentTime,
          isWatched:
            progress.currentTime >= progress.seekableDuration - leftForWatched,
        },
      );

      logger('removeLocalProgress').info(key, response);

      storage.delete(key);
    }),
  );

  episodeData.map(data => {
    if (data.status === 'rejected') {
      logger('sendLocalProgressToCloud REJECTED').warn(data.reason);
      Sentry.captureException(data.reason);
    }
  });
};
