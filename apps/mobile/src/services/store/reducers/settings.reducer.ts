import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSettings } from './interfaces';

interface UserSettingsReducer {
  userSettings: UserSettings | null;
  isFetching: boolean;
}

const initialState: UserSettingsReducer = {
  userSettings: null,
  isFetching: false,
};

export const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    getUserSettingsPending(state: UserSettingsReducer) {
      state.isFetching = true;
    },
    getUserSettingsFulfilled(
      state: UserSettingsReducer,
      action: PayloadAction<UserSettings>,
    ) {
      state.userSettings = action.payload;
      state.isFetching = false;
    },
    getUserSettingsRejected(state: UserSettingsReducer) {
      state.isFetching = false;
    },
    clearUserSettings(state: UserSettingsReducer) {
      state.userSettings = null;
      state.isFetching = false;
    },
  },
});

export const {
  getUserSettingsPending,
  getUserSettingsFulfilled,
  getUserSettingsRejected,
  clearUserSettings,
} = userSettingsSlice.actions;

export default userSettingsSlice.reducer;
