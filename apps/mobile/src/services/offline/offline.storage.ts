import { storageGetData, storageStoreData } from '../../utils';
import { IOfflineSeries, IOfflineSeriesEpisodes } from './interfaces';

const OFFLINE_SERIES_KEY = 'offlineSeries';

const clearOffline = async () => {
  await storageStoreData(OFFLINE_SERIES_KEY, []);
};

const saveOfflineSeries = async (series: IOfflineSeries[]) => {
  await storageStoreData(OFFLINE_SERIES_KEY, [series]);
};

export const offlineStorage = {
  clearOffline,
  saveOfflineSeries,
};
