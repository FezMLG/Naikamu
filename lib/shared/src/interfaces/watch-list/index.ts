import { WatchStatus } from '../../enums';

export interface WatchList {
  Page: Page;
}

interface Page {
  pageInfo: PageInfo;
  media: WatchListMedia[];
}

export interface WatchListMedia {
  readonly series: {
    readonly source: string;
    readonly sourceId: string;
    readonly title: string;
    readonly poster: string;
  };
  readonly status: WatchStatus;
}

export interface WatchListSeries {
  readonly id: string;
  readonly animeId: string;
  readonly status: WatchStatus;
  readonly watched: WatchListSeriesEpisode[];
}

export interface WatchListSeriesEpisode {
  readonly episode: number;
  readonly progress: number;
  readonly isWatched: boolean;
}

interface PageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}
