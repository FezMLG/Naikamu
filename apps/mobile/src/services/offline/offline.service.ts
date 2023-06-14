import { OfflineSeries, OfflineSeriesEpisodes } from './interfaces';
import { offlineFS } from './offline.fs';
import { offlineStorage } from './offline.storage';

const getAllOfflineSeries = async (): Promise<OfflineSeries[]> => {
  const series = await offlineStorage.getAllOfflineSeries();
  return series;
};

const addOfflineSeries = async (series: OfflineSeries) => {
  const exist = await offlineStorage.getOfflineSeries(series.seriesId);
  if (!exist) {
    await offlineStorage.saveOfflineSeries(series);
  }
};

const saveEpisodeOffline = async (
  seriesId: string,
  episode: OfflineSeriesEpisodes,
  fileUrl: string,
) => {
  const series = await offlineStorage.getOfflineSeries(seriesId);
  if (!series) {
    throw new Error('Series not found');
  }

  const pathToFile = await offlineFS.downloadFile(
    seriesId,
    episode.number,
    fileUrl,
  );

  episode.pathToFile = pathToFile;
  series.episodes.push(episode);
  await offlineStorage.saveOfflineSeries(series);
};

const deleteEpisodeOffline = async (
  seriesId: string,
  episodeNumber: number,
) => {
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
  await offlineFS.deleteFile(episode.pathToFile);
};

const deleteSeriesOffline = async (seriesId: string) => {
  const series = await offlineStorage.getOfflineSeries(seriesId);
  if (!series) {
    throw new Error('Series not found');
  }
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
};

export const offlineService = {
  getAllOfflineSeries,
  addOfflineSeries,
  saveEpisodeOffline,
  deleteEpisodeOffline,
  deleteSeriesOffline,
};
