import { create } from 'zustand';
import { IOfflineSeries, IOfflineSeriesEpisodes } from './interfaces';

interface OfflineSeriesState {
  offlineSeries: IOfflineSeries[];
  actions: {
    setSeriesList: (seriesList: IOfflineSeries[]) => void;
    getOfflineEpisodes: (seriesId: string) => IOfflineSeries | undefined;
    getOfflineSeriesList: () => IOfflineSeries[];
    getOfflineSeries: (seriesId: string) => IOfflineSeries | undefined;
    getOfflineEpisode: (
      seriesId: string,
      episodeNumber: number,
    ) => IOfflineSeriesEpisodes | null;
    saveOrReplaceOfflineSeries: (
      seriesToAdd: IOfflineSeries,
    ) => IOfflineSeries[];
    saveOfflineEpisode: (
      seriesId: string,
      episode: IOfflineSeriesEpisodes,
    ) => void;
    deleteOfflineSeries: (seriesId: string) => IOfflineSeries[];
    deleteOfflineEpisode: (
      seriesId: string,
      episodeNumber: number,
    ) => IOfflineSeries[];
    clearOffline: () => void;
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
    getOfflineSeriesList: () => {
      return get().offlineSeries;
    },
    getOfflineSeries: (seriesId: string) => {
      return get().offlineSeries.find(series => series.seriesId === seriesId);
    },
    getOfflineEpisode: (seriesId: string, episodeNumber: number) => {
      const series = get().offlineSeries.find(
        series => series.seriesId === seriesId,
      );
      if (!series) {
        return null;
      }
      const episode = series.episodes.find(
        episode => episode.number === episodeNumber,
      );
      return episode ? episode : null;
    },
    saveOrReplaceOfflineSeries: (seriesToAdd: IOfflineSeries) => {
      const series = get().offlineSeries;
      if (series.find(e => e.seriesId === seriesToAdd.seriesId)) {
        const without = series.filter(e => e.seriesId !== seriesToAdd.seriesId);
        without.push(seriesToAdd);
        set({
          offlineSeries: without,
        });
        return without;
      }
      series.push(seriesToAdd);
      set({
        offlineSeries: series,
      });
      return series;
    },
    saveOfflineEpisode: (seriesId: string, episode: IOfflineSeriesEpisodes) => {
      const series = get().actions.getOfflineSeries(seriesId)!;
      series.episodes.push(episode);
      set(state => ({
        offlineSeries: [...state.offlineSeries, series],
      }));
    },
    deleteOfflineSeries: (seriesId: string) => {
      set(state => ({
        offlineSeries: state.offlineSeries.filter(
          series => series.seriesId !== seriesId,
        ),
      }));
      return get().offlineSeries;
    },
    deleteOfflineEpisode: (seriesId: string, episodeNumber: number) => {
      const series = get().actions.getOfflineSeries(seriesId);
      if (!series) {
        throw new Error('Series not found ' + seriesId);
      }
      series.episodes = series.episodes.filter(
        episode => episode.number !== episodeNumber,
      );
      if (series.episodes.length === 0) {
        get().actions.deleteOfflineSeries(seriesId);
      }
      return get().actions.saveOrReplaceOfflineSeries(series);
    },
    clearOffline: () => {
      set({
        offlineSeries: [],
      });
    },
  },
}));
