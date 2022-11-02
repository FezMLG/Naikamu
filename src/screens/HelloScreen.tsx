import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { API_URL, ENV } from '@env';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { globalStyle } from '../styles/global.style';
import { darkStyle } from '../styles/darkMode.style';
import { useTranslate } from '../i18n/useTranslate';
import { RootState } from '../services/store/store';
import { AuthRoutesNames, HelloScreenProps } from '../routes/auth';

const HelloScreen = ({ navigation }: HelloScreenProps) => {
  const { translate } = useTranslate();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }, [navigation]);

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
      <Button
        mode={'contained'}
        style={[styles.button]}
        onPress={() => navigation.navigate(AuthRoutesNames.Login)}>
        {translate('auth.login')}
      </Button>
      <Button
        mode={'contained-tonal'}
        style={[styles.button, globalStyle.marginTopSmall]}
        onPress={() => navigation.navigate(AuthRoutesNames.SignUp)}>
        {translate('auth.register')}
      </Button>
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
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
  buttons: {
    margin: 16,
  },
  button: {
    maxWidth: 500,
    width: '90%',
    minWidth: 10,
  },
  logo: {
    maxWidth: 200,
    maxHeight: 200,
  },
});

export default HelloScreen;
