import { storageGetData, storageStoreData } from '../../utils';
import { IOfflineSeries, IOfflineSeriesEpisodes } from './interfaces';

const OFFLINE_SERIES_KEY = 'offlineSeries';

//lista serii dostepnych offline
const getAllOfflineSeries = async (): Promise<IOfflineSeries[]> => {
  const series =
    (await storageGetData<IOfflineSeries[]>(OFFLINE_SERIES_KEY)) ?? [];
  return series;
};

const getOfflineSeries = async (
  seriesId: string,
): Promise<IOfflineSeries | null> => {
  const series = (await getAllOfflineSeries()).filter(
    e => e.seriesId === seriesId,
  );
  if (series.length > 1) {
    throw new Error('Too many series');
  }
  return series[0];
};

//lista odcinkow dla serii dostepnej offline
const getOfflineEpisodes = async (
  seriesId: string,
): Promise<IOfflineSeriesEpisodes[]> => {
  const series = await getOfflineSeries(seriesId);
  const episodes = series?.episodes ?? [];
  return episodes;
};

const getOfflineEpisode = async (
  seriesId: string,
  episodeNumber: number,
): Promise<IOfflineSeriesEpisodes | null> => {
  const episodes = await getOfflineEpisodes(seriesId);
  const episode = episodes.filter(e => e.number === episodeNumber);
  if (episode.length > 1) {
    throw new Error('Too many episodes');
  }
  return episode[0];
};

//zapisuje serie offline
const saveOrReplaceOfflineSeries = async (
  seriesToAdd: IOfflineSeries,
): Promise<IOfflineSeries[]> => {
  const series = await getAllOfflineSeries();
  const exist = series.filter(e => e.seriesId === seriesToAdd.seriesId);
  if (exist.length > 0) {
    const whiteout = series.filter(e => e.seriesId !== seriesToAdd.seriesId);
    whiteout.push(seriesToAdd);
    await storageStoreData(OFFLINE_SERIES_KEY, whiteout);
    return whiteout;
  }
  series.push(seriesToAdd);
  await storageStoreData(OFFLINE_SERIES_KEY, series);
  return series;
};

//zapisuje odcinek offline
const saveOfflineEpisode = async (
  seriesId: string,
  episode: IOfflineSeriesEpisodes,
) => {
  const seriesEpisodes = await getOfflineEpisodes(seriesId);

  seriesEpisodes.push(episode);
  await storageStoreData(OFFLINE_SERIES_KEY, seriesEpisodes);
};

//usuwa serie offline
const deleteOfflineSeries = async (
  seriesId: string,
): Promise<IOfflineSeries[]> => {
  const allSeries = await getAllOfflineSeries();
  const filteredSeries = allSeries.filter(e => e.seriesId !== seriesId);
  if (!filteredSeries) {
    throw new Error('Series not found ' + seriesId);
  }
  await storageStoreData(OFFLINE_SERIES_KEY, filteredSeries);
  return filteredSeries;
};

//usuwa odcinek offline
const deleteOfflineEpisode = async (
  seriesId: string,
  episodeNumber: number,
): Promise<IOfflineSeries[]> => {
  const series = await getOfflineSeries(seriesId);
  if (!series) {
    throw new Error('Series not found ' + seriesId);
  }
  series.episodes = series.episodes.filter(e => e.number !== episodeNumber);
  if (series.episodes.length === 0) {
    await deleteOfflineSeries(seriesId);
  }
  return saveOrReplaceOfflineSeries(series);
};

const clearOffline = async () => {
  await storageStoreData(OFFLINE_SERIES_KEY, []);
};

export const offlineStorage = {
  getAllOfflineSeries,
  getOfflineSeries,
  getOfflineEpisodes,
  getOfflineEpisode,
  saveOrReplaceOfflineSeries,
  saveOfflineEpisode,
  deleteOfflineSeries,
  deleteOfflineEpisode,
  clearOffline,
};
