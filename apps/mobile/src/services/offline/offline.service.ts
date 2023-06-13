import { OfflineSeries, OfflineSeriesEpisodes } from './interfaces';
import { offlineFS } from './offline.fs';
import { offlineStorage } from './offline.storage';

const addOfflineSeries = async (series: OfflineSeries) => {
  await offlineStorage.saveOfflineSeries(series);
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
};

export const offlineService = {
  addOfflineSeries,
  saveEpisodeOffline,
};
