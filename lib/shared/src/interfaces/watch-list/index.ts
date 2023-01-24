import { WatchStatus } from '../../enums';

export interface WatchList {
  readonly series: {
    readonly source: string;
    readonly sourceId: string;
    readonly title: string;
    readonly poster: string;
  };
  readonly status: WatchStatus;
}

export interface WatchListAnime {
  readonly status: WatchStatus;
  readonly watched: WatchListAnimeEpisodes[];
}

export interface WatchListAnimeEpisodes {
  readonly episode: number;
  readonly progress: number;
}
