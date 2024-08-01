import { create } from 'zustand';

import { IOfflineSeries, IOfflineSeriesEpisodes } from './interfaces';

export interface IDownloadsQueueItem {
  series: IOfflineSeries;
  episode: IOfflineSeriesEpisodes;
  fileUrl: string;
  referer: string;
}

interface DownloadsState {
  queue: IDownloadsQueueItem[];
  actions: {
    addToQueue: (item: IDownloadsQueueItem) => void;
    removeFromQueue: (seriesId: string, episodeNumber: number) => void;
    clearQueue: () => void;
    isQueueEmpty: () => boolean;
    getFirstItem: () => IDownloadsQueueItem | undefined;
    removeFirstItem: () => void;
    getQueue: () => IDownloadsQueueItem[];
    getQueueLength: () => number;
  };
}

export const useDownloadsQueueStore = create<DownloadsState>((set, get) => ({
  queue: [],
  actions: {
    getQueue: () => get().queue,
    getQueueLength: () => get().queue.length,
    addToQueue: item => {
      set(state => ({
        queue: [...state.queue, item],
      }));
    },
    removeFromQueue: (seriesId, episodeNumber) => {
      set(state => ({
        queue: state.queue.filter(
          job =>
            job.series.seriesId !== seriesId ||
            job.episode.number !== episodeNumber,
        ),
      }));
    },
    clearQueue: () => {
      set(() => ({
        queue: [],
      }));
    },
    isQueueEmpty: () => get().queue.length === 0,
    getFirstItem: () => get().queue[0],
    removeFirstItem: () => {
      set(state => ({
        queue: state.queue.slice(1),
      }));
    },
  },
}));
