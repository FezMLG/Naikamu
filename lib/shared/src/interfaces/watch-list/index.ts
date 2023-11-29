import { WatchStatusNew } from '../../enums';

export interface IWatchListSeries {
  id: string;
  animeId: string;
  title: string;
  status: WatchStatusNew;
  watched: WatchListSeriesEpisode[];
  poster: string;
}

export interface WatchListSeriesEpisode {
  readonly episode: number;
  readonly progress: number;
  readonly isWatched: boolean;
}
