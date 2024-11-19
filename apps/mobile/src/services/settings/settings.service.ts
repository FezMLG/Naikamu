import { logger } from '../../utils';

import { UserSettings } from './interfaces';
import { useUserSettingsStorage } from './settings.storage';
import { defaultSettings, useUserSettingsStore } from './settings.store';

export const useUserSettingsService = () => {
  const { getUserSettingsFromStorage, saveUserSettingsToStorage } =
    useUserSettingsStorage();
  const settings = useUserSettingsStore(state => state.settings);
  const actions = useUserSettingsStore(state => state.actions);

  return {
    userSettings: settings,
    updateUserSettings: (updatedSettings: Partial<UserSettings>) => {
      try {
        const existingSettings = getUserSettingsFromStorage();

        if (!existingSettings) {
          return;
        }

        const userSettings: UserSettings = {
          ...existingSettings,
          ...updatedSettings,
        };

        saveUserSettingsToStorage(userSettings);
        actions.saveSettings(userSettings);
        logger('updateUserSettings').warn('userSettings', userSettings);
      } catch (error: unknown) {
        logger('updateUserSettings').warn(error);
      }
    },
    initializeUserSettings: () => {
      try {
        const existingSettings = getUserSettingsFromStorage();

        logger('initializeUserSettings').warn(
          'existingSettings',
          existingSettings,
        );

        const initializedSettings = {
          ...defaultSettings,
          ...existingSettings,
        };

        saveUserSettingsToStorage(initializedSettings);
        actions.saveSettings(initializedSettings);
      } catch (error: unknown) {
        logger('initializeUserSettings').warn(error);
      }
    },
  };
};
