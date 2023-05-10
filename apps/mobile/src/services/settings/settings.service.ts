import { storageGetData, storageStoreData } from '../../utils';
import { UserSettings } from '../store/reducers/interfaces';
import {
  clearUserSettings,
  getUserSettingsFulfilled,
  getUserSettingsPending,
  getUserSettingsRejected,
} from '../store/reducers/settings.reducer';
import { AppDispatch } from '../store/store';

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
  (settings: UserSettings) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getUserSettingsPending());
      await storageStoreData<string>(STORE_KEY, JSON.stringify(settings));
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

export const settingsService = {
  getUserSettings,
  updateUserSettings,
};
