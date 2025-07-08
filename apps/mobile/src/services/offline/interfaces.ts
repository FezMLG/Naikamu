export interface IOfflineSeries {
  seriesId: string;
  title: string;
  quality: string;
  episodes: IOfflineSeriesEpisodes[];
}

export interface IOfflineSeriesEpisodes {
  number: number;
  title: string;
  length: number;
  translator: string;
  // @deprecated
  pathToFile: string | null;
  pathToManifest: string | null;
  pathToAudio: string | null;
  pathToVideo: string | null;
  size: number;
}
