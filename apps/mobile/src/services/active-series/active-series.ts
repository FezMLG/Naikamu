import { create } from 'zustand';

export interface ActiveSeries {
  id: string;
  title: string;
  episodeLength: number;
  numOfAiredEpisodes: number;
  posterUrl: string;
}

interface ActiveSeriesState {
  series: ActiveSeries;
  actions: {
    setActiveSeries: (player: ActiveSeries) => void;
    updateActiveSeries: (playee: Partial<ActiveSeries>) => void;
  };
}

const initialState: ActiveSeries = {
  id: '',
  title: '',
  episodeLength: 0,
  numOfAiredEpisodes: 0,
  posterUrl: '',
};

export const useActiveSeriesStore = create<ActiveSeriesState>(set => ({
  series: initialState,
  actions: {
    setActiveSeries: series => set({ series }),
    updateActiveSeries: series =>
      set(old => ({
        ...old,
        ...series,
      })),
  },
}));
