import { storageGetData, storageStoreData, logger } from '../../utils';

import { IOfflineSeries } from './interfaces';

const OFFLINE_SERIES_KEY = 'offlineSeries';

const clearOffline = () => {
  storageStoreData(OFFLINE_SERIES_KEY, []);
};

const saveOfflineSeries = (series: IOfflineSeries[]) => {
  logger(saveOfflineSeries.name).info(series);
  storageStoreData(OFFLINE_SERIES_KEY, series);
};

const getOfflineSeriesList = () =>
  storageGetData<IOfflineSeries[]>(OFFLINE_SERIES_KEY);

export const offlineStorage = {
  clearOffline,
  saveOfflineSeries,
  getOfflineSeriesList,
};
