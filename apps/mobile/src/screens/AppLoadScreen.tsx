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
import { ActivityIndicator } from 'react-native-paper';
import { API_URL, ENV } from '@env';
import { useSelector } from 'react-redux';

import { colors, fontStyles, globalStyle } from '../styles/global.style';
import { useTranslate } from '../i18n/useTranslate';
import { RootState, useAppDispatch } from '../services/store/store';
import {
  fireGetIdToken,
  fireGetNewIdToken,
  fireGetUser,
} from '../services/firebase/fire-auth.service';
import { AppLoadingScreenProps, AuthRoutesNames } from '../routes/auth';
import { useQueryApiHealth } from '../api/hooks';

const AppLoadScreen = ({ navigation }: AppLoadingScreenProps) => {
  const { translate } = useTranslate();
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const [longLoading, setLongLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  const apiCheck = useQueryApiHealth();

  const handleLoginCheck = useCallback(async () => {
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
  }, [dispatch, navigation, user?.emailVerified]);

  useEffect(() => {
    if (apiCheck.data) {
      handleLoginCheck();
    }
  }, [apiCheck.data, handleLoginCheck]);

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
      <ActivityIndicator size={'large'} />
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
          style={{
            alignItems: 'center',
          }}>
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
      {ENV !== 'prod' && <Text>api_url: {API_URL}</Text>}
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
});

export default AppLoadScreen;
