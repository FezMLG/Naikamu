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
  // @deprecated Used in the past when downloading directly from mp4
  pathToFile: string | null;
  // Used for downloading with DASH/HLS manifests
  pathToManifest: string | null;
  pathToFiles: string[] | null;
  size: number;
}
