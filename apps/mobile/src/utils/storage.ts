import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';

import { logger } from './logger';

export const storageStoreData = async <T = unknown>(key: string, value: T) => {
  try {
    const jsonValue = JSON.stringify(value);

    await AsyncStorage.setItem(key, jsonValue);
  } catch (error: unknown) {
    logger('storageStoreData').warn(
      `Error storing value for key ${key}`,
      error,
    );
    Sentry.captureException(error);
  }
};

export const storageGetData = async <T = unknown>(
  key: string,
): Promise<T | null | undefined> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);

    return jsonValue == null ? null : JSON.parse(jsonValue);
  } catch (error: unknown) {
    logger('storageGetData').warn(`Error reading value for key ${key}`, error);
    Sentry.captureException(error);
  }
};
