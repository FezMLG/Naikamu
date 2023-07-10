import { create } from 'zustand';
import { IOfflineSeries } from './interfaces';

interface OfflineSeriesState {
  offlineSeries: IOfflineSeries[];
  actions: {
    setSeriesList: (seriesList: IOfflineSeries[]) => void;
  };
}

export const useOfflineSeriesStore = create<OfflineSeriesState>((set, get) => ({
  offlineSeries: [],
  actions: {
    setSeriesList: seriesList => {
      set({
        offlineSeries: seriesList,
      });
    },
    getOfflineEpisodes: (seriesId: string) => {
      return get().offlineSeries.find(series => series.seriesId === seriesId);
    },
  },
}));
