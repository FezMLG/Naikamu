import { create } from 'zustand';
import { IOfflineSeries, IOfflineSeriesEpisodes } from './interfaces';

export interface IDownloadsQueueItem {
  series: IOfflineSeries;
  episode: IOfflineSeriesEpisodes;
  fileUrl: string;
}

interface DownloadsState {
  queue: IDownloadsQueueItem[];
  actions: {
    addToQueue: (item: IDownloadsQueueItem) => void;
    removeFromQueue: (seriesId: string, episodeNumber: number) => void;
    clearQueue: () => void;
    isQueueEmpty: () => boolean;
    getFirstItem: () => IDownloadsQueueItem;
    removeFirstItem: () => void;
    getQueue: () => IDownloadsQueueItem[];
  };
}

export const useDownloadsQueueStore = create<DownloadsState>((set, get) => ({
  queue: [],
  actions: {
    getQueue: () => {
      return get().queue;
    },
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
      set(state => ({
        queue: [],
      }));
    },
    isQueueEmpty: () => {
      return get().queue.length === 0;
    },
    getFirstItem: () => {
      return get().queue[0];
    },
    removeFirstItem: () => {
      set(state => ({
        queue: state.queue.slice(1),
      }));
    },
  },
}));
