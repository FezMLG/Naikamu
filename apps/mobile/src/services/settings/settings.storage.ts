import { storageGetData, storageStoreData } from '../../utils';
import { UserSettings } from './interfaces';

export const useUserSettingsStorage = () => {
  const STORE_KEY = 'user-settings';

  const saveUserSettingsToStorage = async (settings: UserSettings) => {
    await storageStoreData<UserSettings>(STORE_KEY, settings);
  };

  const getUserSettingsFromStorage = async () => {
    const userSettings = await storageGetData<UserSettings>(STORE_KEY);
    return userSettings;
  };

  return {
    saveUserSettingsToStorage,
    getUserSettingsFromStorage,
  };
};
