import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user.reducer';
import userSettingsReducer from './reducers/settings.reducer';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
    userSettings: userSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
