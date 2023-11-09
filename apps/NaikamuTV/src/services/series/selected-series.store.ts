import { AnimeDetails, AnimeEpisodes, IWatchListSeries } from '@naikamu/shared';
import { create } from 'zustand';

interface SelectedSeriesState {
  series: IWatchListSeries | null;
  details: AnimeDetails | null;
  episodes: AnimeEpisodes | null;
  actions: {
    getSeries: () => IWatchListSeries | null;
    setSeries: (seriesToSet: IWatchListSeries | null) => void;
    setDetails: (detailsToSet: AnimeDetails | null) => void;
    setEpisodes: (episodesToSet: AnimeEpisodes | null) => void;
  };
}

export const useSelectedSeriesStore = create<SelectedSeriesState>(
  (set, get) => ({
    series: null,
    details: null,
    episodes: null,
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
      setEpisodes: (episodesToSet: AnimeEpisodes | null) => {
        set({
          episodes: episodesToSet,
        });
      },
    },
  }),
);
