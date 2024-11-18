import { storageGetData, storageStoreData } from '../../utils';

import { UserSettings } from './interfaces';

export const useUserSettingsStorage = () => {
  const STORE_KEY = 'user-settings';

  const saveUserSettingsToStorage = (settings: UserSettings) => {
    storageStoreData<UserSettings>(STORE_KEY, settings);
  };

  const getUserSettingsFromStorage = () =>
    storageGetData<UserSettings>(STORE_KEY);

  return {
    saveUserSettingsToStorage,
    getUserSettingsFromStorage,
  };
};
