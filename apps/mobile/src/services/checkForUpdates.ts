import analytics from '@react-native-firebase/analytics';
import { Platform } from 'react-native';
import semver from 'semver';

import * as packageJson from '../../package.json';
import { apiClient } from '../api/APIClient';

export type CheckForUpdatesResponse =
  | {
      isUpdate: true;
      data: {
        tag_name: string;
        assets: { name: string; browser_download_url: string };
      };
    }
  | {
      isUpdate: false;
    };

export const checkForUpdates = async (): Promise<CheckForUpdatesResponse> => {
  const update = await apiClient.checkForUpdates();

  await analytics().logEvent('check_for_updates', {
    platform: Platform.OS,
    currentVersion: packageJson.version,
    newestVersion: update.tag_name,
  });

  const currentOsUpdate = update.assets.find(a => {
    const android = /^naikamu-\d+\.\d+\.\d+.apk/;
    const ios = /^Naikamu-\d+\.\d+\.\d+.ipa/;

    if (Platform.OS === 'android') {
      return android.test(a.name);
    } else if (Platform.OS === 'ios') {
      return ios.test(a.name);
    }
  });

  if (!currentOsUpdate) {
    throw new Error('Unsupported platform');
  }

  // if (semver.gt(update.tag_name, packageJson.version)) {
  return {
    isUpdate: true,
    data: {
      tag_name: update.tag_name,
      assets: currentOsUpdate,
    },
  };
  // }

  return {
    isUpdate: false,
  };
};
