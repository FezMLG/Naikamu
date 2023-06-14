import { storageGetData, storageStoreData } from '../../utils';
import { OfflineSeries, OfflineSeriesEpisodes } from './interfaces';

const OFFLINE_SERIES_KEY = 'offlineSeries';

//lista serii dostepnych offline
const getAllOfflineSeries = async (): Promise<OfflineSeries[]> => {
  const series =
    (await storageGetData<OfflineSeries[]>(OFFLINE_SERIES_KEY)) ?? [];
  console.log(series);
  return series;
};

const getOfflineSeries = async (
  seriesId: string,
): Promise<OfflineSeries | null> => {
  const series = (await getAllOfflineSeries()).filter(
    e => e.seriesId === seriesId,
  );
  console.log(series);
  if (series.length > 1) {
    throw new Error('Too many series');
  }
  return series[0];
};

//lista odcinkow dla serii dostepnej offline
const getOfflineEpisodes = async (
  seriesId: string,
): Promise<OfflineSeriesEpisodes[]> => {
  const series = await getOfflineSeries(seriesId);
  const episodes = series?.episodes ?? [];
  console.log(episodes);
  return episodes;
};

const getOfflineEpisode = async (
  seriesId: string,
  episodeNumber: number,
): Promise<OfflineSeriesEpisodes | null> => {
  const episodes = await getOfflineEpisodes(seriesId);
  const episode = episodes.filter(e => e.number === episodeNumber);
  console.log(episode);
  if (episode.length > 1) {
    throw new Error('Too many episodes');
  }
  return episode[0];
};

//zapisuje serie offline
const saveOrReplaceOfflineSeries = async (seriesToAdd: OfflineSeries) => {
  const series = await getAllOfflineSeries();
  const exist = series.filter(e => e.seriesId === seriesToAdd.seriesId);
  if (exist.length > 0) {
    const whiteout = series.filter(e => e.seriesId !== seriesToAdd.seriesId);
    whiteout.push(seriesToAdd);
    await storageStoreData(OFFLINE_SERIES_KEY, whiteout);
  } else {
    console.log(series);
    series.push(seriesToAdd);
    await storageStoreData(OFFLINE_SERIES_KEY, series);
  }
};

//zapisuje odcinek offline
const saveOfflineEpisode = async (
  seriesId: string,
  episode: OfflineSeriesEpisodes,
) => {
  const seriesEpisodes = await getOfflineEpisodes(seriesId);

  seriesEpisodes.push(episode);
  await storageStoreData(OFFLINE_SERIES_KEY, seriesEpisodes);
};

//usuwa serie offline
const removeOfflineSeries = async (seriesId: string) => {
  const series = await getOfflineSeries(seriesId);

  await storageStoreData(OFFLINE_SERIES_KEY, series);
};

//usuwa odcinek offline
const removeOfflineEpisode = async (
  episodeId: string,
  episodeNumber: number,
) => {
  const seriesEpisodes = await getOfflineEpisodes(episodeId);

  seriesEpisodes.filter(e => e.number !== episodeNumber);
  await storageStoreData(OFFLINE_SERIES_KEY, seriesEpisodes);
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
  removeOfflineSeries,
  removeOfflineEpisode,
  clearOffline,
};
