import { create } from 'zustand';

import { userVisibleWatchStatuses } from './userVisibleWatchStatuses';

interface WatchListState {
  filters: Map<string, string>;
  actions: {
    updateFilters: (key: string, value: string) => void;
  };
}

export const useWatchListStore = create<WatchListState>(set => ({
  filters: new Map(
    userVisibleWatchStatuses
      .filter(status => status.isDefaultActive)
      .map(status => [status.key, status.key]),
  ),
  actions: {
    updateFilters: (key: string, value: string) => {
      set(state => {
        if (state.filters.has(key)) {
          state.filters.delete(key);

          return { filters: new Map(state.filters) };
        }

        return { filters: new Map(state.filters.set(key, value)) };
      });
    },
  },
}));
