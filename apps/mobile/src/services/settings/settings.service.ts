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
        console.log('userSettings', userSettings);
      } catch (e: unknown) {
        console.log(e);
      }
    },
    initializeUserSettings: async () => {
      try {
        const existingSettings = await getUserSettingsFromStorage();
        if (!existingSettings) {
          console.log('no existing settings, saving default settings');
          await saveUserSettingsToStorage(defaultSettings);
        }
        actions.saveSettings({ ...defaultSettings, ...existingSettings });
      } catch (e: unknown) {
        console.log(e);
      }
    },
  };
};
