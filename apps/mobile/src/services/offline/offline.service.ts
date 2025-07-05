import { DownloadOption } from '@naikamu/shared';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

import { logger } from '../../utils';
import { useActiveSeriesStore } from '../active-series';
import { event } from '../events';
import {
  NotificationForegroundServiceEvents,
  // useNotificationService,
} from '../notifications';
import { useUserSettingsService } from '../settings';

import { IEpisodeDownloadJob, useDownloadsStore } from './downloads.store';
import { IOfflineSeries, IOfflineSeriesEpisodes } from './interfaces';
import { offlineFS } from './offline.fs';
import { offlineStorage } from './offline.storage';
import { useOfflineSeriesStore } from './offline.store';
import { useDownloadsQueueStore } from './queue.store';

const MAX_CONCURRENT_DOWNLOADS = 2;

export const useOfflineService = () => {
  const downloadJobs = useDownloadsStore(state => state.activeDownloads);
  const downloadsActions = useDownloadsStore(state => state.actions);

  const queueActions = useDownloadsQueueStore(state => state.actions);

  const offlineState = useOfflineSeriesStore(state => state.offlineSeries);
  const offlineActions = useOfflineSeriesStore(state => state.actions);

  // const notificationService = useNotificationService();

  const activeSeries = useActiveSeriesStore(store => store.series)!;

  const {
    userSettings: { preferredDownloadQuality },
  } = useUserSettingsService();

  const checkIfSeriesExist = (seriesId: string) => {
    const result = offlineActions.getOfflineSeries(seriesId);

    if (!result) {
      throw new Error(`Series ${seriesId} not found`);
    }

    return result;
  };

  const getOrCreateOfflineSeries = (seriesId: string) => {
    let series = offlineActions.getOfflineSeries(seriesId);

    if (!series) {
      series = addOfflineSeries();
    }

    return series;
  };

  const addOfflineSeries = (): IOfflineSeries => {
    const exist = offlineActions.getOfflineSeries(activeSeries.id);

    if (!exist) {
      const saved = offlineActions.saveOrReplaceOfflineSeries({
        seriesId: activeSeries.id,
        title: activeSeries.title,
        quality: preferredDownloadQuality,
        episodes: [],
      });

      offlineStorage.saveOfflineSeries(saved);

      const seriesSaved = offlineActions.getOfflineSeries(activeSeries.id);

      if (!seriesSaved) {
        throw new Error('addOfflineSeries Failed to save series');
      }

      return seriesSaved;
    }

    return exist;
  };

  const saveEpisodeOffline = async () => {
    const firstItem = queueActions.getFirstItem();

    if (!firstItem) {
      logger('saveEpisodeOffline').warn(
        'saveEpisodeOffline was called without items in queue',
      );

      return;
    }

    queueActions.removeFirstItem();

    if (Platform.OS === 'android') {
      event.emit(NotificationForegroundServiceEvents.UPDATE);
    }

    const { series, episode, downloadOption, referer } = firstItem;

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
      // logger('progressDownload').info(
      //   ((result.bytesWritten / result.contentLength) * 100).toFixed(2),
      // );

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
        referer,
        beginDownload,
        progressDownload,
      );

    logger('progressDownload').info(
      'download started',
      jobId,
      relativePathToFile,
      fileUrl,
      referer,
    );

    job.then(async result => {
      downloadsActions.removeDownload(jobId);
      episode.size = result.bytesWritten;
      episode.pathToFile = relativePathToFile;
      series.episodes.push(episode);
      logger('progressDownload').info('job done', series);

      const saved = offlineActions.saveOrReplaceOfflineSeries(series);

      offlineStorage.saveOfflineSeries(saved);

      // if (Platform.OS === 'ios') {
      //   await notificationService.displayNotification('download', {
      //     key: 'finish.ios',
      //     format: {
      //       episode: episode.number,
      //       series: series.title,
      //     },
      //   });
      // }

      const firstItemInQueue = queueActions.getFirstItem();
      const downloadsActive = downloadsActions.getActiveDownloads();

      if (
        firstItemInQueue &&
        downloadsActive.length < MAX_CONCURRENT_DOWNLOADS
      ) {
        saveEpisodeOffline();

        return;
      }

      if (!firstItemInQueue && downloadsActive.length === 0) {
        if (Platform.OS === 'ios') {
          RNFS.completeHandlerIOS(jobId);
        }
        if (Platform.OS === 'android') {
          event.emit(NotificationForegroundServiceEvents.STOP);
        }
        logger('progressDownload').warn(
          'no items in queue left and all downloads finished',
        );
      }
    });
  };

  const addToQueue = async ({
    episode,
    downloadOption,
    referer,
  }: {
    episode: IOfflineSeriesEpisodes;
    downloadOption: DownloadOption;
    referer: string;
  }) => {
    const series = getOrCreateOfflineSeries(activeSeries.id);

    const isQueueEmpty = queueActions.isQueueEmpty();
    const downloadsActive = downloadsActions.getActiveDownloads();

    queueActions.addToQueue({
      series,
      episode,
      downloadOption,
      referer,
    });

    // if (
    //   isQueueEmpty &&
    //   downloadsActive.length === 0 &&
    //   Platform.OS === 'android'
    // ) {
    //   notificationService.registerForegroundService();
    //   await notificationService.attachNotificationToService(
    //     'download',
    //     'progress',
    //   );
    // }

    if (
      (!isQueueEmpty || downloadsActive.length > 0) &&
      Platform.OS === 'android'
    ) {
      event.emit(NotificationForegroundServiceEvents.UPDATE);
    }

    if (downloadsActive.length < MAX_CONCURRENT_DOWNLOADS) {
      await saveEpisodeOffline();
    }
  };

  const deleteSeriesOffline = async (seriesId: string) => {
    const series = checkIfSeriesExist(seriesId);

    if (!series.episodes) {
      throw new Error('Series not downloaded');
    }
    await Promise.all(
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
    getAllOfflineSeries: (): IOfflineSeries[] => {
      const state = offlineActions.getOfflineSeriesList();

      if (state.length === 0) {
        const local = offlineStorage.getOfflineSeriesList();

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

      offlineStorage.saveOfflineSeries(saved);
    },
    stopDownload: async (download: IEpisodeDownloadJob) => {
      const { jobId, series, episode } = download;

      offlineFS.stopDownloadingFile(jobId);
      downloadsActions.removeDownload(jobId);
      queueActions.removeFromQueue(series.seriesId, episode.number);

      const downloadsActive = downloadsActions.getActiveDownloads();

      if (downloadsActive.length < 3) {
        await saveEpisodeOffline();
      }
    },
    clearOffline: () => offlineStorage.clearOffline(),
  };
};
