import { WatchStatus } from '../../enums';

export interface IWatchListSeries {
  id: string;
  animeId: string;
  title: string;
  status: WatchStatus;
  watched: WatchListSeriesEpisode[];
  poster: string;
}

export interface WatchListSeriesEpisode {
  readonly episode: number;
  readonly progress: number;
  readonly isWatched: boolean;
}

export interface IUpdateWatchListEpisode {
  isWatched?: boolean;
  progress?: number;
}

export interface IWatchListImport {
  id: string;
  platform: string;
  status: string;
  startedAt: Date;
  finishedAt: Date;
}
