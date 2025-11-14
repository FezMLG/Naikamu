import * as Sentry from '@sentry/react-native';

import { logger } from './logger';
import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

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
