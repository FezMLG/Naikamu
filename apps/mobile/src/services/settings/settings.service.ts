import { logger } from '../../utils';

import { useNotificationService } from '../notifications';
import { INotificationSettings, UserSettings } from './interfaces';
import { useUserSettingsStorage } from './settings.storage';
import { defaultSettings, useUserSettingsStore } from './settings.store';

export const useUserSettingsService = () => {
  const { getUserSettingsFromStorage, saveUserSettingsToStorage } =
    useUserSettingsStorage();
  const settings = useUserSettingsStore(state => state.settings);
  const actions = useUserSettingsStore(state => state.actions);
  const notificationsService = useNotificationService();

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
    updateUserNotificationSettings: async (
      updatedSettings: Partial<INotificationSettings>,
    ) => {
      try {
        const existingSettings = getUserSettingsFromStorage();

        logger('updateUserNotificationSettings').info(existingSettings);

        if (!existingSettings) {
          return;
        }

        const userSettings: UserSettings = {
          ...existingSettings,
          notifications: {
            ...existingSettings.notifications,
            ...updatedSettings,
          },
        };

        if (updatedSettings.enabled) {
          await notificationsService.initialize();
        } else {
          await notificationsService.disable();
        }

        saveUserSettingsToStorage(userSettings);
        actions.saveSettings(userSettings);
        logger('updateUserNotificationSettings').warn(
          'userSettings',
          userSettings,
        );
      } catch (error: unknown) {
        logger('updateUserNotificationSettings').warn(error);
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
          notifications: {
            ...defaultSettings.notifications,
            ...existingSettings?.notifications,
          },
        };

        saveUserSettingsToStorage(initializedSettings);
        actions.saveSettings(initializedSettings);
      } catch (error: unknown) {
        logger('initializeUserSettings').warn(error);
      }
    },
  };
};
