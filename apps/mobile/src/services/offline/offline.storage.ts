import { storageGetData, storageStoreData } from '../../utils';
import { logger } from '../../utils/logger';

import { IOfflineSeries } from './interfaces';

const OFFLINE_SERIES_KEY = 'offlineSeries';

const clearOffline = async () => {
  await storageStoreData(OFFLINE_SERIES_KEY, []);
};

const saveOfflineSeries = async (series: IOfflineSeries[]) => {
  logger(saveOfflineSeries.name).info(series);
  await storageStoreData(OFFLINE_SERIES_KEY, series);
};

const getOfflineSeriesList = async () =>
  storageGetData<IOfflineSeries[]>(OFFLINE_SERIES_KEY);

export const offlineStorage = {
  clearOffline,
  saveOfflineSeries,
  getOfflineSeriesList,
};
