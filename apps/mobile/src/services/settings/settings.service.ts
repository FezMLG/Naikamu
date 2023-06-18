import { storageGetData, storageStoreData } from '../../utils';
import { UserSettings } from './interfaces';
import {
  clearUserSettings,
  getUserSettingsFulfilled,
  getUserSettingsPending,
  getUserSettingsRejected,
} from '../redux/reducers/settings.reducer';
import { AppDispatch } from '../redux/store';

const STORE_KEY = 'user-settings';

const getUserSettings = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(clearUserSettings());
    dispatch(getUserSettingsPending());
    const userSettings = await storageGetData<string>(STORE_KEY);

    if (userSettings) {
      console.log('userSettings', userSettings);
      dispatch(getUserSettingsFulfilled(JSON.parse(userSettings)));
    }
  } catch (e: unknown) {
    dispatch(getUserSettingsRejected());
    console.log(e);
  }
};

const updateUserSettings =
  (settings: Partial<UserSettings>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getUserSettingsPending());
      const existingSettings = await storageGetData<UserSettings>(STORE_KEY);
      if (!existingSettings) {
        return dispatch(getUserSettingsRejected());
      }

      const userSettings: UserSettings = {
        ...existingSettings,
        ...settings,
      };

      await storageStoreData(STORE_KEY, userSettings);

      if (userSettings) {
        console.log('userSettings', userSettings);
        dispatch(getUserSettingsFulfilled(userSettings));
      }
    } catch (e: unknown) {
      dispatch(getUserSettingsRejected());
      console.log(e);
    }
  };

export const settingsService = {
  getUserSettings,
  updateUserSettings,
};
