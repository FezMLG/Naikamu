import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';

import { colors, fontStyles, globalStyle } from '../styles/global.style';
import { useTranslate } from '../i18n/useTranslate';
import { RootState, useAppDispatch } from '../services/redux/store';
import {
  fireGetIdToken,
  fireGetNewIdToken,
  fireGetUser,
} from '../services/firebase/fire-auth.service';
import { AppLoadingScreenProps, AuthRoutesNames } from '../routes/auth';
import { useQueryApiHealth } from '../api/hooks';
import { useUserSettingsService } from '../services/settings/settings.service';
import semver from 'semver';
import { ActivityIndicator } from '../components';

const AppLoadScreen = ({ navigation }: AppLoadingScreenProps) => {
  const supportedApiVersion = require('../../package.json').apiVersion;

  const { translate } = useTranslate();
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const [longLoading, setLongLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const { initializeUserSettings } = useUserSettingsService();

  const apiCheck = useQueryApiHealth(data => {
    if (semver.satisfies(data.version, supportedApiVersion)) {
      handleLoginCheck();
    } else {
      console.log('wrong api');
      navigation.navigate(AuthRoutesNames.ActionRequired);
    }
  });

  const handleLoginCheck = useCallback(async () => {
    await initializeUserSettings();
    const token = await fireGetIdToken();
    if (token) {
      await dispatch(await fireGetNewIdToken());
      await dispatch(fireGetUser());
      if (!user?.emailVerified && user?.emailVerified !== undefined) {
        navigation.navigate(AuthRoutesNames.VerifyEmail);
      }
    } else {
      navigation.navigate(AuthRoutesNames.Hello);
    }
  }, [dispatch, initializeUserSettings, navigation, user?.emailVerified]);

  useEffect(() => {
    setTimeout(() => {
      setLongLoading(true);
    }, 3000);
    setTimeout(() => {
      setLongLoading(false);
      setApiError(true);
    }, 15000);
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <Text>{user?.displayName ? user?.displayName : user?.email}</Text>
      <Text style={[colors.textLight, fontStyles.text]}>
        {translate('welcomeScreen.welcome')}
      </Text>
      <Text style={[colors.textLight, fontStyles.screenHeader]}>AniWatch</Text>
      <View style={[globalStyle.spacerBig]} />
      <Image
        style={styles.logo}
        source={require('../../assets/aniwatch_logo_t.png')}
      />
      <View style={[globalStyle.spacerBig]} />
      <ActivityIndicator size={'large'} visible={true} />
      {longLoading && (
        <Text style={[fontStyles.text, globalStyle.textCenter]}>
          {translate('welcomeScreen.apiLoading')}
        </Text>
      )}
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
            ]}>
            {translate('welcomeScreen.apiContact')}
          </Text>
        </Pressable>
      )}
      {apiCheck.isError ?? <Text>{JSON.stringify(apiCheck.error)}</Text>}
      {Config.ENV !== 'prod' && <Text>api_url: {Config.API_URL}</Text>}
    </SafeAreaView>
  );
};

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

export default AppLoadScreen;
