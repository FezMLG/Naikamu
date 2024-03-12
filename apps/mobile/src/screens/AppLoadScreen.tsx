import React, { useCallback, useEffect, useState } from 'react';

import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { default as Config } from 'react-native-config';
import semver from 'semver';

import Logo from '../../assets/logo_full.svg';
import * as packageJson from '../../package.json';
import { useQueryApiHealth } from '../api/hooks';
import {
  ActivityIndicator,
  EnvironmentDebug,
  PageLayout,
  useLayout,
} from '../components';
import { useTranslate } from '../i18n/useTranslate';
import {
  AuthStackAppLoadingScreenProps,
  AuthStackRoutesNames,
} from '../routes';
import {
  offlineFS,
  useNotificationService,
  useOfflineService,
  useUserSettingsService,
} from '../services';
import { useUserService } from '../services/auth/user.service';
import { useUserStore } from '../services/auth/user.store';
import {
  fireGetIdToken,
  fireGetNewIdToken,
} from '../services/firebase/fire-auth.service';
import { sendLocalProgressToCloud } from '../services/watch-list/sendLocalProgressToCloud';
import { colors, fontStyles, globalStyle } from '../styles';
import { logger } from '../utils/logger';
import analytics from '@react-native-firebase/analytics';

export function AppLoadScreen({ navigation }: AuthStackAppLoadingScreenProps) {
  const supportedApiVersion = packageJson.apiVersion;
  const layout = useLayout();
  const { translate } = useTranslate();
  const [, setLongLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const { initializeUserSettings } = useUserSettingsService();
  const userService = useUserService();
  const user = useUserStore(state => state.user);
  const [netInfo] = useState<NetInfoState>();
  const notifications = useNotificationService();
  const offlineService = useOfflineService();

  useEffect(() => {
    (async () => {
      await checkConnection();
      await notifications.initialize();
      await offlineFS.checkPermissions();
      await offlineService.getAllOfflineSeries();
      setTimeout(() => {
        layout.setInfo(translate('welcomeScreen.apiLoading'));
        layout.setVisible(true);
        setLongLoading(true);
      }, 3000);
      setTimeout(() => {
        setLongLoading(false);
        setApiError(true);
      }, 15_000);
    })();
  }, []);

  const checkConnection = useCallback(async () => {
    await NetInfo.fetch().then(async state => {
      logger('NetInfo').info('Connection type', state.type);
      logger('NetInfo').info('Is connected?', state.isConnected);
      if (state.isConnected) {
        await analytics().logAppOpen();
        await apiCheck.refetch();
        await sendLocalProgressToCloud();
      } else {
        layout.setInfo('useQueryApiHealth#onError');
        await initializeUserSettings();
        await userService.readUserFromStorage();
        await userService.setLoggedUser();
      }
    });
  }, []);

  const apiCheck = useQueryApiHealth(async data => {
    logger('useQueryApiHealth').info(data);
    if (semver.satisfies(data.version, supportedApiVersion)) {
      await handleLoginCheck();
    } else {
      logger('API Version Check').warn(
        'Wrong version',
        'API',
        data.version,
        'Supported',
        supportedApiVersion,
      );
      navigation.navigate(AuthStackRoutesNames.ActionRequired);
    }
  });

  const handleLoginCheck = useCallback(async () => {
    await initializeUserSettings();
    const token = await fireGetIdToken();

    if (token) {
      await fireGetNewIdToken();
      await userService.setLoggedUser();
      logger('handleLoginCheck').info(user);
      if (!user?.emailVerified && user?.emailVerified !== undefined) {
        navigation.navigate(AuthStackRoutesNames.VerifyEmail);
      }
    }
    navigation.navigate(AuthStackRoutesNames.Hello);
  }, [initializeUserSettings, navigation]);

  return (
    <PageLayout.Default style={[styles.container]} {...layout}>
      <EnvironmentDebug
        style={[
          {
            width: '90%',
          },
        ]}>
        <Logo style={styles.logo} width="90%" />
      </EnvironmentDebug>
      <View style={[globalStyle.spacer]} />
      <ActivityIndicator size="large" visible={true} />
      {apiError && (
        <Pressable
          onPress={() =>
            Linking.openURL('https://github.com/FezMLG/Naikamu/issues')
          }
          style={styles.centerBox}>
          <Text
            style={[
              fontStyles.paragraph,
              colors.error,
              globalStyle.textCenter,
            ]}>
            {translate('welcomeScreen.apiError')}
          </Text>
          <Text
            style={[
              fontStyles.paragraph,
              fontStyles.underline,
              globalStyle.textCenter,
              colors.textLight,
            ]}>
            {translate('welcomeScreen.apiContact')}
          </Text>
        </Pressable>
      )}
      {apiCheck.isError ? (
        <Text style={[fontStyles.paragraph, colors.textLight]}>
          There was an error
          {JSON.stringify(apiCheck.error)}
        </Text>
      ) : null}
      {Config.ENV !== 'production' && (
        <Text style={[fontStyles.paragraph, colors.textLight]}>
          api_url: {Config.API_URL}
          {JSON.stringify(netInfo)}
        </Text>
      )}
    </PageLayout.Default>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    margin: 16,
  },
  logo: {
    alignSelf: 'center',
    width: '90%',
  },
  centerBox: {
    alignItems: 'center',
  },
});
