import { create } from 'zustand';

import { Resolution, UserSettings } from './interfaces';

type UserSettingsKeys = keyof UserSettings;
type UserSettingsValues = UserSettings[UserSettingsKeys];

type NotificationSettingsKeys = keyof UserSettings['notifications'];
type NotificationSettingsValues =
  UserSettings['notifications'][NotificationSettingsKeys];

interface UserSettingsState {
  settings: UserSettings;
  actions: {
    saveSettings: (settings: UserSettings) => void;
    changeSetting: (key: UserSettingsKeys, value: UserSettingsValues) => void;
    changeNotificationSetting: (
      key: NotificationSettingsKeys,
      value: NotificationSettingsValues,
    ) => void;
  };
}

export const defaultSettings: UserSettings = {
  preferredResolution: Resolution['1080p'],
  preferredDownloadQuality: Resolution['1080p'],
  notifications: {
    enabled: true,
    general: true,
    updates: true,
    important: true,
    download: true,
  },
};

export const useUserSettingsStore = create<UserSettingsState>(set => ({
  settings: defaultSettings,
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
    changeNotificationSetting: (key, value) => {
      set(state => ({
        settings: {
          ...state.settings,
          notifications: {
            ...state.settings.notifications,
            [key]: value,
          },
        },
      }));
    },
  },
}));
