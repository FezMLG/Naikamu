import React, { useCallback, useEffect, useState } from 'react';

import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { default as Config } from 'react-native-config';
import semver from 'semver';

import { apiClient } from '../api/APIClient';
import { useQueryApiHealth } from '../api/hooks';
import Logo from '../assets/logo.svg';
import { ActivityIndicator } from '../components';
import { useTranslate } from '../i18n/useTranslate';
import {
  AuthStackAppLoadingScreenProps,
  AuthStackRoutesNames,
} from '../routes';
import {
  fireGetIdToken,
  fireGetNewIdToken,
  sendLocalProgressToCloud,
  useUserService,
  useUserStore,
} from '../services';
import HomeScreenChannel from '../services/HomeScreenChannel';
import { colors, fontStyles, globalStyle } from '../styles';
import { logger } from '../utils';

export function AppLoadScreen({ navigation }: AuthStackAppLoadingScreenProps) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires,unicorn/prefer-module
  const supportedApiVersion = require('../../package.json').apiVersion;
  const { translate } = useTranslate();
  const [, setLongLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const userService = useUserService();
  const userStore = useUserStore(state => state.actions);
  const [netInfo] = useState<NetInfoState>();

  useEffect(() => {
    HomeScreenChannel.createDefaultChannel();

    checkConnection();
    setTimeout(() => {
      setLongLoading(false);
      setApiError(true);
    }, 15_000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apiCheck = useQueryApiHealth(async () => {
    const data = await apiClient.getApiHealth();

    logger('useQueryApiHealth').warn(data);
    if (semver.satisfies(data.version, supportedApiVersion)) {
      handleLoginCheck();
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

    return data;
  });

  const checkConnection = useCallback(async () => {
    await NetInfo.fetch().then(async state => {
      logger('NetInfo').info('Connection type', state.type);
      logger('NetInfo').info('Is connected?', state.isConnected);
      if (state.isConnected) {
        // await apiCheck.refetch();
        await handleLoginCheck();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoginCheck = useCallback(async () => {
    const token = await fireGetIdToken();

    if (token) {
      await fireGetNewIdToken();
      await sendLocalProgressToCloud();
      await userService.setLoggedUser();
      logger('handleLoginCheck').info(userStore.getUser());
    } else {
      navigation.navigate(AuthStackRoutesNames.Hello);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
      }}>
      <Logo style={styles.logo} width="90%" />
      <View style={[globalStyle.spacer]} />
      <ActivityIndicator size="large" />
      {apiError && (
        <Text style={[fontStyles.text, colors.error, globalStyle.textCenter]}>
          {translate('welcomeScreen.apiError')}
        </Text>
      )}
      {apiCheck.isError ? (
        <Text style={[fontStyles.text, colors.textLight]}>
          There was an error
          {JSON.stringify(apiCheck.error)}
        </Text>
      ) : null}
      {Config.ENV !== 'production' && (
        <Text style={[fontStyles.text, colors.textLight]}>
          api_url: {Config.API_URL}
          {JSON.stringify(netInfo)}
        </Text>
      )}
    </SafeAreaView>
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
