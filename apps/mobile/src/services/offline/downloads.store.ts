import { create } from 'zustand';
import { IOfflineSeries, IOfflineSeriesEpisodes } from './interfaces';

export interface IEpisodeDownloadJob {
  jobId: number;
  series: IOfflineSeries;
  episode: IOfflineSeriesEpisodes;
  progress?: number;
}

interface DownloadsState {
  activeDownloads: IEpisodeDownloadJob[];
  actions: {
    addDownload: (job: IEpisodeDownloadJob) => void;
    removeDownload: (jobId: number) => void;
    changeProgress: (jobId: number, progress: number) => void;
  };
}

export const useDownloadsStore = create<DownloadsState>(set => ({
  activeDownloads: [],
  actions: {
    addDownload: job => {
      set(state => ({
        activeDownloads: [...state.activeDownloads, job],
      }));
    },
    removeDownload: jobId => {
      set(state => ({
        activeDownloads: state.activeDownloads.filter(
          job => job.jobId !== jobId,
        ),
      }));
    },
    changeProgress: (jobId, progress) => {
      set(state => ({
        activeDownloads: state.activeDownloads.map(job =>
          job.jobId === jobId ? { ...job, progress } : job,
        ),
      }));
    },
  },
}));
