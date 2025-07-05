import { PlayerType } from '../enums';

export interface IPlayerResponse {
  type: PlayerType;
  uri: string | null;
  status: number;
  title: string | null;
  downloadable: boolean;
}

export interface MPDDownload {
  dataType: 'mpd';
  data: {
    video: string | null;
    audio: string | null;
    mpd: string | null;
  };
}

export interface FileDownload {
  dataType: 'single-file';
  data: {
    file: string | null;
  };
}

export type DownloadOption = MPDDownload | FileDownload | null;

export interface IResolvedVideoDownloadResponse {
  status: number;
  downloadable: boolean;
  title: string | null;
  download: DownloadOption;
}
