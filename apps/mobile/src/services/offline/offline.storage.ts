import { storageGetData, storageStoreData } from '../../utils';
import { IOfflineSeries, IOfflineSeriesEpisodes } from './interfaces';

const OFFLINE_SERIES_KEY = 'offlineSeries';

const clearOffline = async () => {
  await storageStoreData(OFFLINE_SERIES_KEY, []);
};

const saveOfflineSeries = async (series: IOfflineSeries[]) => {
  await storageStoreData(OFFLINE_SERIES_KEY, series);
};

const getOfflineSeriesList = async () => {
  return storageGetData<IOfflineSeries[]>(OFFLINE_SERIES_KEY);
};

export const offlineStorage = {
  clearOffline,
  saveOfflineSeries,
  getOfflineSeriesList,
};
