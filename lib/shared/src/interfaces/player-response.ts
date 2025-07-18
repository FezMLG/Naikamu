import { PlayerType } from '../enums';

export interface IPlayerResponse {
  type: PlayerType;
  uri: string | null;
  status: number;
  title: string | null;
  downloadable: boolean;
}

export interface ManifestDownload {
  dataType: 'mpd' | 'hls';
  data: {
    mainManifest: string | null;
    files: string[] | null;
  };
}

export interface FileDownload {
  dataType: 'single-file';
  data: {
    file: string | null;
  };
}

export type DownloadOption = ManifestDownload | FileDownload | null;

export interface IResolvedVideoDownloadResponse {
  status: number;
  downloadable: boolean;
  title: string | null;
  download: DownloadOption;
}
