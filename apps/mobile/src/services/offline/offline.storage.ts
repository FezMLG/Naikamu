import { storageGetData, storageStoreData } from '../../utils';
import { OfflineSeries, OfflineSeriesEpisodes } from './interfaces';

const OFFLINE_SERIES_KEY = 'offlineSeries';

//lista serii dostepnych offline
const getOfflineSeries = async (): Promise<OfflineSeries[]> => {
  const series =
    (await storageGetData<OfflineSeries[]>(OFFLINE_SERIES_KEY)) ?? [];
  console.log(series);
  return series;
};

//lista odcinkow dla serii dostepnej offline
const getOfflineEpisodes = async (
  seriesId: string,
): Promise<OfflineSeriesEpisodes[]> => {
  const series = await getOfflineSeries();
  const episodes = series.find(s => s.seriesId === seriesId)?.episodes ?? [];
  console.log(episodes);
  return episodes;
};

//zapisuje serie offline
const saveOfflineSeries = async (seriesToAdd: OfflineSeries) => {
  const series = await getOfflineSeries();
  console.log(series);
  series.push(seriesToAdd);
  await storageStoreData(OFFLINE_SERIES_KEY, series);
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
  const series = await getOfflineSeries();

  series.filter(e => e.seriesId !== seriesId);
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

export const offlineStorage = {
  getOfflineSeries,
  getOfflineEpisodes,
  saveOfflineSeries,
  saveOfflineEpisode,
  removeOfflineSeries,
  removeOfflineEpisode,
};
