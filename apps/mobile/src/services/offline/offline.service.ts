import RNFS from 'react-native-fs';
import { IOfflineSeries, IOfflineSeriesEpisodes } from './interfaces';
import { offlineFS } from './offline.fs';
import { offlineStorage } from './offline.storage';
import { IEpisodeDownloadJob, useDownloadsStore } from './downloads.store';
import { useOfflineSeriesStore } from './offline.store';
import { useDownloadsQueueStore } from './queue.store';

export const useOfflineService = () => {
  const downloadJobs = useDownloadsStore(state => state.activeDownloads);
  const downloadsActions = useDownloadsStore(state => state.actions);

  const queueActions = useDownloadsQueueStore(state => state.actions);

  const offlineState = useOfflineSeriesStore(state => state.offlineSeries);
  const offlineActions = useOfflineSeriesStore(state => state.actions);

  const saveEpisodeOffline = async () => {
    const firstItem = queueActions.getFirstItem();
    if (!firstItem) {
      console.log('no items in queue');
      return;
    }
    const { series, episode, fileUrl } = firstItem;
    await offlineStorage.getOfflineSeries(series.seriesId).then(result => {
      if (!result) {
        throw new Error('Series not found');
      }
    });

    const beginDownload = async (res: RNFS.DownloadBeginCallbackResult) => {
      console.log('begin download');
      downloadsActions.addDownload({
        jobId: res.jobId,
        series,
        episode,
      });
    };

    const progressDownload = async (
      res: RNFS.DownloadProgressCallbackResult,
    ) => {
      console.log(
        'progress download',
        Math.round((res.bytesWritten / res.contentLength) * 100),
      );
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

    console.log('download started', jobId, pathToFile);

    job.then(async result => {
      downloadsActions.removeDownload(jobId);
      episode.size = result.bytesWritten;
      episode.pathToFile = pathToFile;
      series.episodes.push(episode);
      console.log('job done', series);
      await offlineStorage.saveOrReplaceOfflineSeries(series).then(saved => {
        offlineActions.setSeriesList(saved);
      });
      queueActions.removeFirstItem();
      const firstItem = queueActions.getFirstItem();
      if (!firstItem) {
        RNFS.completeHandlerIOS(jobId);
        console.log('no items in queue 2');
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
    const series = await offlineStorage
      .getOfflineSeries(seriesId)
      .then(result => {
        if (!result) {
          throw new Error('Series not found');
        }
        return result;
      });

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

  return {
    activeDownloads: downloadJobs,
    queueDownloads: useDownloadsQueueStore().queue,
    offlineSeries: offlineState,
    offlineStore: offlineActions,
    addOfflineSeries: async (series: IOfflineSeries) => {
      const exist = await offlineStorage.getOfflineSeries(series.seriesId);
      if (!exist) {
        await offlineStorage.saveOrReplaceOfflineSeries(series).then(saved => {
          offlineActions.setSeriesList(saved);
        });
      }
    },
    getAllOfflineSeries: async (): Promise<IOfflineSeries[]> => {
      const series = await offlineStorage.getAllOfflineSeries();
      return series;
    },
    getOfflineEpisodes: async (seriesId: string) => {
      const series = await offlineStorage.getOfflineSeries(seriesId);
      if (!series) {
        throw new Error('Series not found');
      }
      return series.episodes;
    },
    addToQueue,
    saveEpisodeOffline,
    checkIfEpisodeIsDownloaded: async (
      seriesId: string,
      episodeNumber: number,
    ): Promise<boolean> => {
      const series = await offlineStorage.getOfflineSeries(seriesId);
      if (!series) {
        return false;
      }
      const episode = series.episodes.find(e => e.number === episodeNumber);
      return !!episode;
    },
    deleteSeriesOffline: async (seriesId: string) => {
      const series = await offlineStorage.getOfflineSeries(seriesId);
      if (!series) {
        throw new Error('Series not found');
      }
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
      await offlineStorage.deleteOfflineSeries(seriesId).then(saved => {
        offlineActions.setSeriesList(saved);
      });
    },
    deleteEpisodeOffline: async (seriesId: string, episodeNumber: number) => {
      const episode = await offlineStorage.getOfflineEpisode(
        seriesId,
        episodeNumber,
      );
      if (!episode) {
        throw new Error('Episode not found');
      }
      if (!episode.pathToFile) {
        throw new Error('Episode not downloaded');
      }
      offlineFS.deleteFile(episode.pathToFile);
      await offlineStorage
        .deleteOfflineEpisode(seriesId, episodeNumber)
        .then(saved => {
          offlineActions.setSeriesList(saved);
        });
    },
    stopDownload: async (download: IEpisodeDownloadJob) => {
      const { jobId } = download;
      await offlineFS.stopDownloadingFile(jobId);
      downloadsActions.removeDownload(jobId);
    },
    clearOffline: async () => {
      offlineStorage.clearOffline();
    },
  };
};
