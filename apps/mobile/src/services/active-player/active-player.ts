import { PlayerType } from '@aniwatch/shared';
import { create } from 'zustand';

import { Resolution } from '../settings/interfaces';

export interface ActivePlayer {
  animeId: string;
  name: string;
  url: string;
  resolved_url?: string;
  type?: PlayerType;
  resolution: Resolution;
  translator: string;
  episode: number;
}

interface ActivePlayerState {
  player: ActivePlayer | null;
  actions: {
    setActivePlayer: (player: ActivePlayer) => void;
    clearActivePlayer: () => void;
    updateActivePlayer: (playee: Partial<ActivePlayer>) => void;
  };
}

export const useActivePlayerStore = create<ActivePlayerState>(set => ({
  player: null,
  actions: {
    setActivePlayer: player => set({ player }),
    clearActivePlayer: () => set({ player: null }),
    updateActivePlayer: player =>
      set(old => ({
        ...old,
        ...player,
      })),
  },
}));
