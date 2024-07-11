import { create } from 'zustand';

import { IWatchListImportChunkData } from '@naikamu/shared';

interface WatchListImportState {
  chunks: IWatchListImportChunkData[];
  actions: {
    addChunks: (chunk: IWatchListImportChunkData[]) => void;
    getChunks: () => IWatchListImportChunkData[];
    clearChunks(): void;
  };
}

export const useWatchListImportStore = create<WatchListImportState>(
  (set, get) => ({
    chunks: [],
    actions: {
      addChunks: (chunk: IWatchListImportChunkData[]) =>
        set(state => ({ chunks: [...state.chunks, ...chunk] })),
      getChunks: () => get().chunks,
      clearChunks: () => {
        set({ chunks: [] });
      },
    },
  }),
);
