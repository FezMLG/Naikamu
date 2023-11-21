import { WatchListSeriesEpisode } from '@naikamu/shared';

export const calculateNumberOfWatched = (watched: WatchListSeriesEpisode[]) =>
  watched.filter(element => element.isWatched).length;
