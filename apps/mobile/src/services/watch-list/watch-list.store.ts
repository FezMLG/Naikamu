import { create } from 'zustand';

interface WatchListState {
  filters: Map<string, string>;
  actions: {
    updateFilters: (key: string, value: string) => void;
  };
}

export const useWatchListStore = create<WatchListState>(set => ({
  filters: new Map(),
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
