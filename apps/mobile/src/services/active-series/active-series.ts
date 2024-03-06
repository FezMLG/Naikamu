import { AnimeEpisode } from '@naikamu/shared';
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
  episodes: AnimeEpisode[];
  actions: {
    setActiveSeries: (series: ActiveSeries) => void;
    updateActiveSeries: (series: Partial<ActiveSeries>) => void;
    setEpisodes: (episodes: AnimeEpisode[]) => void;
    getEpisode: (number: number) => AnimeEpisode;
    updateEpisode: (number: number, episode: Partial<AnimeEpisode>) => void;
  };
}

const initialState: ActiveSeries = {
  id: '',
  title: '',
  episodeLength: 0,
  numOfAiredEpisodes: 0,
  posterUrl: '',
};

const initialEpisodes: AnimeEpisode[] = [];

export const useActiveSeriesStore = create<ActiveSeriesState>((set, get) => ({
  series: initialState,
  episodes: initialEpisodes,
  actions: {
    setActiveSeries: series => set({ series }),
    updateActiveSeries: series =>
      set(old => ({
        ...old,
        ...series,
      })),
    setEpisodes: episodes => set({ episodes }),
    getEpisode: number => {
      const episodes = get().episodes;

      const episode = episodes.find(element => element.number === number);

      if (!episode) {
        throw new Error(
          `Episode with number ${number} from series ${
            get().series.id
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
            get().series.id
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
}));
