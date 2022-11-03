import React, { useCallback, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { API_URL, ENV } from '@env';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { globalStyle } from '../styles/global.style';
import { darkStyle } from '../styles/darkMode.style';
import { useTranslate } from '../i18n/useTranslate';
import { RootState, useAppDispatch } from '../services/store/store';
import { fireRetrieveTokensFromStorage } from '../services/firebase/fire-auth-storage.service';
import {
  fireGetNewIdToken,
  fireGetUser,
} from '../services/firebase/fire-auth.service';
import { AppLoadingScreenProps, AuthRoutesNames } from '../routes/auth';

const AppLoadScreen = ({ navigation }: AppLoadingScreenProps) => {
  const { translate } = useTranslate();
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const handleLoginCheck = useCallback(async () => {
    await fireGetNewIdToken();
    const token = await fireRetrieveTokensFromStorage();
    if (token) {
      dispatch(fireGetUser());
      if (!user?.emailVerified) {
        navigation.navigate(AuthRoutesNames.VerifyEmail);
      }
      navigation.navigate(AuthRoutesNames.VerifyEmail);
    }
    navigation.navigate(AuthRoutesNames.Hello);
  }, [dispatch, navigation, user?.emailVerified]);

  useEffect(() => {
    handleLoginCheck();
  }, [handleLoginCheck]);

  return (
    <SafeAreaView style={[styles.container]}>
      <Text>{user?.displayName ? user?.displayName : user?.email}</Text>
      <Text variant="titleLarge" style={darkStyle.font}>
        {translate('welcomeScreen.welcome')}
      </Text>
      <Text
        variant="displayMedium"
        style={[darkStyle.font, { fontWeight: 'bold' }]}>
        AniWatch
      </Text>
      <View style={[globalStyle.spacerBig]} />
      <Image
        style={styles.logo}
        source={require('../../assets/aniwatch_logo_t.png')}
      />
      <View style={[globalStyle.spacerBig]} />
      <ActivityIndicator size={'large'} />
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
