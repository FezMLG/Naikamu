import { IWatchListSeries } from '@naikamu/shared';
import { create } from 'zustand';

interface SelectedSeriesState {
  series: IWatchListSeries | null;
  actions: {
    getSeries: () => IWatchListSeries | null;
    setSeries: (seriesToSet: IWatchListSeries | null) => void;
  };
}

export const useSelectedSeriesStore = create<SelectedSeriesState>(
  (set, get) => ({
    series: null,
    actions: {
      getSeries: () => get().series,
      setSeries: (seriesToSet: IWatchListSeries | null) => {
        set({
          series: seriesToSet,
        });
      },
    },
  }),
);
