import { User } from '@naikamu/shared';
import { create } from 'zustand';

import { setCrashlyticsUser } from '../../utils';

interface UserState {
  user: User | null;
  actions: {
    getUser: () => User | null;
    setUser: (userToSet: User | null) => void;
    updateUser: (update: Partial<User>) => void;
  };
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  actions: {
    getUser: () => get().user,
    setUser: (userToSet: User | null) => {
      setCrashlyticsUser(userToSet?.uid ?? null);
      set({
        user: userToSet,
      });
    },
    updateUser: (update: Partial<User>) => {
      set(state => ({
        user: {
          ...state.user!,
          ...update,
        },
      }));
    },
  },
}));
