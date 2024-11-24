import { useCallback } from 'react';

import NetInfo from '@react-native-community/netinfo';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { default as Config } from 'react-native-config';
import * as RNLocalize from 'react-native-localize';
import semver from 'semver';

import * as packageJson from '../../package.json';
import { apiClient } from '../api/APIClient';
import { useLayout } from '../components';
import { AuthStackRoutesNames } from '../routes';
import { logger } from '../utils';

import { useUserService } from './auth/user.service';
import { useUserStore } from './auth/user.store';
import {
  fireGetIdToken,
  fireGetNewIdToken,
} from './firebase/fire-auth.service';
import { useNotificationService } from './notifications';
import { offlineFS, useOfflineService } from './offline';
import { useUserSettingsService } from './settings';
import { sendLocalProgressToCloud } from './watch-list';

export const useAppLoadService = () => {
  const supportedApiVersion = packageJson.apiVersion;
  const notifications = useNotificationService();
  const userService = useUserService();
  const { initializeUserSettings } = useUserSettingsService();
  const userActions = useUserStore(state => state.actions);
  const navigation = useNavigation<any>();
  const layout = useLayout();
  const offlineService = useOfflineService();

  const initializeServices = useCallback(async () => {
    await notifications.initialize();
    await initializeUserSettings();
    await offlineFS.checkPermissions();
  }, []);

  const checkApiVersion = useCallback(async (apiVersion: string) => {
    if (!semver.satisfies(apiVersion, supportedApiVersion)) {
      logger('API Version Check').warn(
        'Wrong version',
        'API',
        apiVersion,
        'Supported',
        supportedApiVersion,
      );
      navigation.navigate(AuthStackRoutesNames.ActionRequired);
    }
  }, []);

  const checkConnection = useCallback(
    async () =>
      NetInfo.fetch().then(async state => {
        logger('NetInfo').info('Connection', state);
        await analytics().logEvent('app_open', {
          connection: state.type,
          isConnected: state.isConnected,
          appVersion: packageJson.version,
          environment: Config.ENV,
        });

        return state.isConnected;
      }),
    [],
  );

  const checkLoggedInUser = useCallback(async () => {
    const token = await fireGetIdToken();

    if (token) {
      await fireGetNewIdToken();
      await sendLocalProgressToCloud();
      userService.setLoggedUser();
      const user = userActions.getUser();

      logger('handleLoginCheck').info(user);
      if (user && !user.emailVerified) {
        navigation.navigate(AuthStackRoutesNames.VerifyEmail);
      }
    } else {
      navigation.navigate(AuthStackRoutesNames.Hello);
    }
  }, []);

  const initialize = useCallback(async () => {
    await analytics().logEvent('app_initialize', {
      country: RNLocalize.getCountry(),
    });

    await initializeServices();
    const isConnection = await checkConnection();

    if (isConnection) {
      const apiCheck = await apiClient.getApiHealth();

      logger('useQueryApiHealth').info(apiCheck);

      await checkApiVersion(apiCheck.version);

      await checkLoggedInUser();
    } else {
      layout.setInfo('useQueryApiHealth#onError');
      userService.readUserFromStorage();
      userService.setLoggedUser();
      offlineService.getAllOfflineSeries();
    }
  }, []);

  return {
    initialize,
  };
};
