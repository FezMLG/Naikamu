import { create } from 'zustand';
import { Resolution, UserSettings } from './interfaces';

type UserSettingsKeys = keyof UserSettings;
type UserSettingsValues = UserSettings[UserSettingsKeys];

interface UserSettingsState {
  settings: UserSettings;
  actions: {
    saveSettings: (settings: UserSettings) => void;
    changeSetting: (key: UserSettingsKeys, value: UserSettingsValues) => void;
  };
}

export const useUserSettingsStore = create<UserSettingsState>(set => ({
  settings: {
    preferredResolution: Resolution['1080p'],
    preferredDownloadQuality: Resolution['1080p'],
  },
  actions: {
    saveSettings: settings => {
      set({ settings });
    },
    changeSetting: (key, value) => {
      set(state => ({
        settings: {
          ...state.settings,
          [key]: value,
        },
      }));
    },
  },
}));
