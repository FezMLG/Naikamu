import { create } from 'zustand';

export interface ActiveSeries {
  id: string;
  title: string;
  episodeLength: number;
  numOfAiredEpisodes: number;
  posterUrl: string;
}

interface ActiveSeriesState {
  series: ActiveSeries | null;
  actions: {
    setActivePlayer: (player: ActiveSeries) => void;
    clearActivePlayer: () => void;
    updateActivePlayer: (playee: Partial<ActiveSeries>) => void;
  };
}

export const useActiveSeriesStore = create<ActiveSeriesState>(set => ({
  series: null,
  actions: {
    setActivePlayer: series => set({ series }),
    clearActivePlayer: () => set({ series: null }),
    updateActivePlayer: series =>
      set(old => ({
        ...old,
        ...series,
      })),
  },
}));
