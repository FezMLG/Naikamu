export interface IOfflineSeries {
  seriesId: string;
  title: string;
  size: string;
  quality: string;
  episodes: IOfflineSeriesEpisodes[];
}

export interface IOfflineSeriesEpisodes {
  number: number;
  title: string;
  length: number;
  translator: string;
  pathToFile: string | null;
  size?: number;
}
