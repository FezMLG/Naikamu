import RNFS from 'react-native-fs';
import { IOfflineSeries, IOfflineSeriesEpisodes } from './interfaces';
import { offlineFS } from './offline.fs';
import { offlineStorage } from './offline.storage';
import { IEpisodeDownloadJob, useDownloadsStore } from './downloads.store';
import { useOfflineSeriesStore } from './offline.store';
import { useDownloadsQueueStore } from './queue.store';
import { logger } from '../../utils/logger';

export const useOfflineService = () => {
  const downloadJobs = useDownloadsStore(state => state.activeDownloads);
  const downloadsActions = useDownloadsStore(state => state.actions);

  const queueActions = useDownloadsQueueStore(state => state.actions);

  const offlineState = useOfflineSeriesStore(state => state.offlineSeries);
  const offlineActions = useOfflineSeriesStore(state => state.actions);

  const checkIfSeriesExist = (seriesId: string) => {
    const result = offlineActions.getOfflineSeries(seriesId);
    if (!result) {
      throw new Error(`Series ${seriesId} not found`);
    }
    return result;
  };

  const isSeriesWithEpisodes = (seriesId: string) => {
    const series = offlineActions.getOfflineSeries(seriesId);
    if (!series) {
      throw new Error(`Series ${seriesId} not found`);
    }
    return series.episodes.length > 0;
  };

  const saveEpisodeOffline = async () => {
    const firstItem = queueActions.getFirstItem();
    if (!firstItem) {
      logger('no items in queue').warn();
      return;
    }
    const { series, episode, fileUrl } = firstItem;

    checkIfSeriesExist(series.seriesId);

    const beginDownload = async (res: RNFS.DownloadBeginCallbackResult) => {
      logger('begin download').info();
      downloadsActions.addDownload({
        jobId: res.jobId,
        series,
        episode,
      });
    };

    const progressDownload = async (
      res: RNFS.DownloadProgressCallbackResult,
    ) => {
      logger(
        'progress download',
        Math.round((res.bytesWritten / res.contentLength) * 100),
      ).info();

      downloadsActions.changeProgress(
        jobId,
        res.bytesWritten / res.contentLength,
      );
    };

    const [pathToFile, jobId, job] = await offlineFS.startDownloadingFile(
      series.seriesId,
      episode.number,
      fileUrl,
      beginDownload,
      progressDownload,
    );

    logger('download started', jobId, pathToFile).info();

    job.then(async result => {
      downloadsActions.removeDownload(jobId);
      episode.size = result.bytesWritten;
      episode.pathToFile = pathToFile;
      series.episodes.push(episode);
      logger('job done', series).info();

      const saved = offlineActions.saveOrReplaceOfflineSeries(series);
      await offlineStorage.saveOfflineSeries(saved);

      queueActions.removeFirstItem();
      const firstItem = queueActions.getFirstItem();
      if (!firstItem) {
        RNFS.completeHandlerIOS(jobId);
        logger('no items in queue 2', series).warn();
      } else {
        saveEpisodeOffline();
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
      const episode = series.episodes.find(e => e.number === episodeNumber);
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
      offlineFS.deleteFile(episode.pathToFile);
      const saved = offlineActions.deleteOfflineEpisode(
        seriesId,
        episodeNumber,
      );
      await offlineStorage.saveOfflineSeries(saved);
    },
    stopDownload: async (download: IEpisodeDownloadJob) => {
      const { jobId } = download;
      await offlineFS.stopDownloadingFile(jobId);
      downloadsActions.removeDownload(jobId);
      queueActions.removeFromQueue(
        download.series.seriesId,
        download.episode.number,
      );
      if (!queueActions.isQueueEmpty()) {
        saveEpisodeOffline();
      }
    },
    clearOffline: async () => {
      offlineStorage.clearOffline();
    },
  };
};
