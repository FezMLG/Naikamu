import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

import { logger } from '../../utils/logger';
import { useNotificationService } from '../notifications';

import { IEpisodeDownloadJob, useDownloadsStore } from './downloads.store';
import { IOfflineSeries, IOfflineSeriesEpisodes } from './interfaces';
import { offlineFS } from './offline.fs';
import { offlineStorage } from './offline.storage';
import { useOfflineSeriesStore } from './offline.store';
import { useDownloadsQueueStore } from './queue.store';

export const useOfflineService = () => {
  const downloadJobs = useDownloadsStore(state => state.activeDownloads);
  const downloadsActions = useDownloadsStore(state => state.actions);

  const queueActions = useDownloadsQueueStore(state => state.actions);

  const offlineState = useOfflineSeriesStore(state => state.offlineSeries);
  const offlineActions = useOfflineSeriesStore(state => state.actions);

  const notificationService = useNotificationService();

  const checkIfSeriesExist = (seriesId: string) => {
    const result = offlineActions.getOfflineSeries(seriesId);

    if (!result) {
      throw new Error(`Series ${seriesId} not found`);
    }

    return result;
  };

  const saveEpisodeOffline = async () => {
    await notificationService.initialize();

    const firstItem = queueActions.getFirstItem();

    if (!firstItem) {
      logger('saveEpisodeOffline').warn(
        'saveEpisodeOffline was called without items in queue',
      );

      return;
    }
    const { series, episode, fileUrl } = firstItem;

    checkIfSeriesExist(series.seriesId);

    const beginDownload = async (result: RNFS.DownloadBeginCallbackResult) => {
      logger('begin download').info();
      downloadsActions.addDownload({
        jobId: result.jobId,
        series,
        episode,
      });
    };

    const progressDownload = async (
      result: RNFS.DownloadProgressCallbackResult,
    ) => {
      logger('progressDownload').info(
        ((result.bytesWritten / result.contentLength) * 100).toFixed(2),
      );

      downloadsActions.changeProgress(
        jobId,
        result.bytesWritten / result.contentLength,
      );
    };

    const [relativePathToFile, jobId, job] =
      await offlineFS.startDownloadingFile(
        series.seriesId,
        episode.number,
        fileUrl,
        beginDownload,
        progressDownload,
      );

    logger('progressDownload').info(
      'download started',
      jobId,
      relativePathToFile,
    );

    job.then(async result => {
      downloadsActions.removeDownload(jobId);
      episode.size = result.bytesWritten;
      episode.pathToFile = relativePathToFile;
      series.episodes.push(episode);
      logger('progressDownload').info('job done', series);

      const saved = offlineActions.saveOrReplaceOfflineSeries(series);

      await offlineStorage.saveOfflineSeries(saved);

      queueActions.removeFirstItem();
      const firstItemInQueue = queueActions.getFirstItem();

      if (firstItemInQueue) {
        await saveEpisodeOffline();
      } else {
        if (Platform.OS === 'ios') {
          RNFS.completeHandlerIOS(jobId);
        }
        logger('progressDownload').warn('no items in queue left', series);

        await notificationService.displayNotification(
          'notifications.download.finish',
        );
      }
    });
  };

  const addToQueue = async ({
    seriesId,
    episode,
    fileUrl,
  }: {
    seriesId: string;
    episode: IOfflineSeriesEpisodes;
    fileUrl: string;
  }) => {
    const series = checkIfSeriesExist(seriesId);

    const isQueueEmpty = queueActions.isQueueEmpty();

    queueActions.addToQueue({
      series,
      episode,
      fileUrl,
    });

    if (isQueueEmpty) {
      saveEpisodeOffline();
    }
  };

  const deleteSeriesOffline = async (seriesId: string) => {
    const series = checkIfSeriesExist(seriesId);

    if (!series.episodes) {
      throw new Error('Series not downloaded');
    }
    Promise.all(
      series.episodes.map(async episode => {
        if (!episode.pathToFile) {
          throw new Error('Episode not downloaded');
        }
        await offlineFS.deleteFile(episode.pathToFile);
      }),
    );
    const saved = offlineActions.deleteOfflineSeries(seriesId);

    offlineStorage.saveOfflineSeries(saved);
  };

  return {
    activeDownloads: downloadJobs,
    queueDownloads: useDownloadsQueueStore().queue,
    offlineSeries: offlineState,
    offlineStore: offlineActions,
    addOfflineSeries: async (series: IOfflineSeries) => {
      const exist = offlineActions.getOfflineSeries(series.seriesId);

      if (!exist) {
        const saved = offlineActions.saveOrReplaceOfflineSeries(series);

        await offlineStorage.saveOfflineSeries(saved);
      }
    },
    getAllOfflineSeries: async (): Promise<IOfflineSeries[]> => {
      const state = offlineActions.getOfflineSeriesList();

      if (state.length === 0) {
        const local = await offlineStorage.getOfflineSeriesList();

        if (Array.isArray(local)) {
          offlineActions.setSeriesList(local);
        }
      }

      return offlineActions.getOfflineSeriesList();
    },
    getOfflineEpisodes: async (seriesId: string) => {
      const series = checkIfSeriesExist(seriesId);

      return series.episodes;
    },
    addToQueue,
    saveEpisodeOffline,
    checkIfEpisodeIsDownloaded: async (
      seriesId: string,
      episodeNumber: number,
    ): Promise<boolean> => {
      const series = offlineActions.getOfflineSeries(seriesId);

      if (!series) {
        return false;
      }
      const episode = series.episodes.find(
        element => element.number === episodeNumber,
      );

      return !!episode;
    },
    deleteSeriesOffline,
    deleteEpisodeOffline: async (seriesId: string, episodeNumber: number) => {
      const episode = offlineActions.getOfflineEpisode(seriesId, episodeNumber);

      if (!episode) {
        throw new Error('Episode not found');
      }
      if (!episode.pathToFile) {
        throw new Error('Episode not downloaded');
      }

      await offlineFS.deleteFile(episode.pathToFile);
      const saved = offlineActions.deleteOfflineEpisode(
        seriesId,
        episodeNumber,
      );

      await offlineStorage.saveOfflineSeries(saved);
    },
    stopDownload: async (download: IEpisodeDownloadJob) => {
      const { jobId, series, episode } = download;

      offlineFS.stopDownloadingFile(jobId);
      downloadsActions.removeDownload(jobId);
      queueActions.removeFromQueue(series.seriesId, episode.number);
      if (!queueActions.isQueueEmpty()) {
        saveEpisodeOffline();
      }
    },
    clearOffline: async () => {
      await offlineStorage.clearOffline();
    },
  };
};
