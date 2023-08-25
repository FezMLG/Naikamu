import React, { useCallback, useEffect, useState } from 'react';

import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { default as Config } from 'react-native-config';
import semver from 'semver';

import { useQueryApiHealth } from '../api/hooks';
import { ActivityIndicator, PageLayout, useLayout } from '../components';
import { useTranslate } from '../i18n/useTranslate';
import {
  AuthStackAppLoadingScreenProps,
  AuthStackRoutesNames,
} from '../routes';
import { useUserService } from '../services/auth/user.service';
import { useUserStore } from '../services/auth/user.store';
import {
  fireGetIdToken,
  fireGetNewIdToken,
} from '../services/firebase/fire-auth.service';
import { useUserSettingsService } from '../services/settings/settings.service';
import { colors, fontStyles, globalStyle } from '../styles';
import { logger } from '../utils/logger';

export function AppLoadScreen({ navigation }: AuthStackAppLoadingScreenProps) {
  const supportedApiVersion = require('../../package.json').apiVersion;
  const layout = useLayout();
  const { translate } = useTranslate();
  const [, setLongLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const { initializeUserSettings } = useUserSettingsService();
  const userService = useUserService();
  const user = useUserStore(state => state.user);
  const [netInfo] = useState<NetInfoState>();

  useEffect(() => {
    checkConnection();
    setTimeout(() => {
      layout.setInfo(translate('welcomeScreen.apiLoading'));
      layout.setVisible(true);
      setLongLoading(true);
    }, 3000);
    setTimeout(() => {
      setLongLoading(false);
      setApiError(true);
    }, 15_000);
  }, []);

  const checkConnection = useCallback(async () => {
    logger('useQueryApiHealth').warn();
    await NetInfo.fetch().then(async state => {
      logger('NetInfo').info('Connection type', state.type);
      logger('NetInfo').info('Is connected?', state.isConnected);
      if (!state.isConnected) {
        layout.setInfo('useQueryApiHealth#onError');
        await initializeUserSettings();
        await userService.readUserFromStorage();
        userService.setLoggedUser();
      }
    });
  }, []);

  const apiCheck = useQueryApiHealth(data => {
    if (semver.satisfies(data.version, supportedApiVersion)) {
      handleLoginCheck();
    } else {
      console.log('wrong api');
      navigation.navigate(AuthStackRoutesNames.ActionRequired);
    }
  });

  const handleLoginCheck = useCallback(async () => {
    await initializeUserSettings();
    const token = await fireGetIdToken();

    if (token) {
      await fireGetNewIdToken();
      userService.setLoggedUser();
      logger('handleLoginCheck').info(user);
      if (!user?.emailVerified && user?.emailVerified !== undefined) {
        navigation.navigate(AuthStackRoutesNames.VerifyEmail);
      }
    } else {
      navigation.navigate(AuthStackRoutesNames.Hello);
    }
  }, [initializeUserSettings, navigation]);

  return (
    <PageLayout.Default style={[styles.container]} {...layout}>
      <Text>{user?.displayName ?? user?.email}</Text>
      <Text style={[colors.textLight, fontStyles.text]}>
        {translate('welcomeScreen.welcome')}
      </Text>
      <Text style={[colors.textLight, fontStyles.screenHeader]}>AniWatch</Text>
      <View style={[globalStyle.spacerBig]} />
      <Image
        source={require('../../assets/aniwatch_logo_t.png')}
        style={styles.logo}
      />
      <View style={[globalStyle.spacerBig]} />
      <ActivityIndicator size="large" visible={true} />
      {apiError && (
        <Pressable
          onPress={() =>
            Linking.openURL('https://github.com/FezMLG/AniWatch/issues/new')
          }
          style={styles.centerBox}>
          <Text style={[fontStyles.text, colors.error, globalStyle.textCenter]}>
            {translate('welcomeScreen.apiError')}
          </Text>
          <Text
            style={[
              fontStyles.text,
              fontStyles.underline,
              globalStyle.textCenter,
              colors.textLight,
            ]}>
            {translate('welcomeScreen.apiContact')}
          </Text>
        </Pressable>
      )}
      {apiCheck.isError ? (
        <Text style={[fontStyles.text, colors.textLight]}>
          There was an error
          {JSON.stringify(apiCheck.error)}
        </Text>
      ) : null}
      {Config.ENV !== 'prod' && (
        <Text style={[fontStyles.text, colors.textLight]}>
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
    maxWidth: 200,
    maxHeight: 200,
  },
  centerBox: {
    alignItems: 'center',
  },
});
