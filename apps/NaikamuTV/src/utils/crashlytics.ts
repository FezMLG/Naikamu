import {
  getCrashlytics,
  log,
  recordError,
  setUserId,
} from '@react-native-firebase/crashlytics';

const toError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }

  return new Error(typeof error === 'string' ? error : JSON.stringify(error));
};

export const reportError = (error: unknown) =>
  recordError(getCrashlytics(), toError(error));

export const addBreadcrumb = (message: string) =>
  log(getCrashlytics(), message);

export const setCrashlyticsUser = (uid: string | null) =>
  setUserId(getCrashlytics(), uid ?? '');
