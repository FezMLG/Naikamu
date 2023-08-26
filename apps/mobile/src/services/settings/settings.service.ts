import { logger } from '../../utils/logger';

import { Resolution, UserSettings } from './interfaces';
import { useUserSettingsStorage } from './settings.storage';
import { useUserSettingsStore } from './settings.store';

export const useUserSettingsService = () => {
  const { getUserSettingsFromStorage, saveUserSettingsToStorage } =
    useUserSettingsStorage();
  const settings = useUserSettingsStore(state => state.settings);
  const actions = useUserSettingsStore(state => state.actions);
  const defaultSettings: UserSettings = {
    preferredResolution: Resolution['1080p'],
    preferredDownloadQuality: Resolution['1080p'],
  };

  return {
    userSettings: settings,
    updateUserSettings: async (updatedSettings: Partial<UserSettings>) => {
      try {
        const existingSettings = await getUserSettingsFromStorage();

        if (!existingSettings) {
          return;
        }

        const userSettings: UserSettings = {
          ...existingSettings,
          ...updatedSettings,
        };

        await saveUserSettingsToStorage(userSettings);
        actions.saveSettings(userSettings);
        logger('updateUserSettings').warn('userSettings', userSettings);
      } catch (error: unknown) {
        logger('updateUserSettings').warn(error);
      }
    },
    initializeUserSettings: async () => {
      try {
        const existingSettings = await getUserSettingsFromStorage();

        if (!existingSettings) {
          logger('initializeUserSettings').warn(
            'no existing settings, saving default settings',
          );
          await saveUserSettingsToStorage(defaultSettings);
        }
        actions.saveSettings({ ...defaultSettings, ...existingSettings });
      } catch (error: unknown) {
        logger('initializeUserSettings').warn(error);
      }
    },
  };
};
