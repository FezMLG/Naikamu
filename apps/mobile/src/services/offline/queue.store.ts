import { create } from 'zustand';
import { IOfflineSeriesEpisodes } from './interfaces';

export interface IDownloadsQueueItem {
  seriesId: string;
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
  };
}

export const useDownloadsQueueStore = create<DownloadsState>((set, get) => ({
  queue: [],
  actions: {
    addToQueue: item => {
      set(state => ({
        queue: [...state.queue, item],
      }));
    },
    removeFromQueue: (seriesId, episodeNumber) => {
      set(state => ({
        queue: state.queue.filter(
          job =>
            job.seriesId !== seriesId && job.episode.number !== episodeNumber,
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
