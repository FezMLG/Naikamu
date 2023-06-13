export interface OfflineSeries {
  seriesId: string;
  title: string;
  size: string;
  quality: string;
  episodes: OfflineSeriesEpisodes[];
}

export interface OfflineSeriesEpisodes {
  number: number;
  title: string;
  length: number;
  translator: string;
}
