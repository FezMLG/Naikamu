import {
  AnimeDetails,
  AnimeEpisode,
  IWatchListSeries,
  WatchListSeriesEpisode,
} from '@naikamu/shared';
import { create } from 'zustand';

interface SelectedSeriesState {
  series: IWatchListSeries | null;
  details: AnimeDetails | null;
  episodes: AnimeEpisode[];
  actions: {
    getSeries: () => IWatchListSeries | null;
    setSeries: (seriesToSet: IWatchListSeries | null) => void;
    getDetails: () => AnimeDetails | null;
    setDetails: (detailsToSet: AnimeDetails | null) => void;
    setEpisodes: (episodesToSet: AnimeEpisode[]) => void;
    getEpisode: (number: number) => AnimeEpisode;
    updateEpisode: (number: number, episode: Partial<AnimeEpisode>) => void;
  };
}

export const useSelectedSeriesStore = create<SelectedSeriesState>(
  (set, get) => ({
    series: null,
    details: null,
    episodes: [],
    actions: {
      getSeries: () => get().series,
      setSeries: (seriesToSet: IWatchListSeries | null) => {
        set({
          series: seriesToSet,
        });
      },
      getDetails: () => get().details,
      setDetails: (detailsToSet: AnimeDetails | null) => {
        set({
          details: detailsToSet,
        });
      },
      setEpisodes: (episodesToSet: AnimeEpisode[]) => {
        set({
          episodes: episodesToSet,
        });
      },
      getEpisode: number => {
        const episodes = get().episodes;

        const episode = episodes.find(element => element.number === number);

        if (!episode) {
          throw new Error(
            `Episode with number ${number} from series ${
              get().series!.id
            } not found`,
          );
        }

        return episode;
      },
      updateEpisode: (number, episode) => {
        const episodes = get().episodes;
        const episodeIndex = episodes.findIndex(
          element => element.number === number,
        );

        if (episodeIndex === -1) {
          throw new Error(
            `Episode with number ${number} from series ${
              get().series!.id
            } not found`,
          );
        }

        set(state => ({
          episodes: [
            ...state.episodes.slice(0, episodeIndex),
            {
              ...state.episodes[episodeIndex],
              ...episode,
            },
            ...state.episodes.slice(episodeIndex + 1),
          ],
        }));
      },
    },
  }),
);
