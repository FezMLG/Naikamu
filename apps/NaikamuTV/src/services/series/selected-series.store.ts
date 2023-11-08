import { AnimeDetails, IWatchListSeries } from '@naikamu/shared';
import { create } from 'zustand';

interface SelectedSeriesState {
  series: IWatchListSeries | null;
  details: AnimeDetails | null;
  actions: {
    getSeries: () => IWatchListSeries | null;
    setSeries: (seriesToSet: IWatchListSeries | null) => void;
    setDetails: (detailsToSet: AnimeDetails | null) => void;
  };
}

export const useSelectedSeriesStore = create<SelectedSeriesState>(
  (set, get) => ({
    series: null,
    details: null,
    actions: {
      getSeries: () => get().series,
      setSeries: (seriesToSet: IWatchListSeries | null) => {
        set({
          series: seriesToSet,
        });
      },
      setDetails: (detailsToSet: AnimeDetails | null) => {
        set({
          details: detailsToSet,
        });
      },
    },
  }),
);
