import * as Sentry from '@sentry/react-native';
import { MMKV } from 'react-native-mmkv';

import { logger } from './logger';

export const storage = new MMKV();

export const storageStoreData = <T = unknown>(key: string, value: T): void => {
  try {
    const jsonValue = JSON.stringify(value);

    storage.set(key, jsonValue);
  } catch (error: unknown) {
    logger('storageStoreData').warn(
      `Error storing value for key ${key}`,
      error,
    );
    Sentry.captureException(error);
  }
};

export const storageGetData = <T = unknown>(
  key: string,
): T | null | undefined => {
  try {
    const jsonValue = storage.getString(key);

    return jsonValue == null ? null : JSON.parse(jsonValue);
  } catch (error: unknown) {
    logger('storageGetData').warn(`Error reading value for key ${key}`, error);
    Sentry.captureException(error);
  }
};
