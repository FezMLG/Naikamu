import React, { useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { API_URL, ENV } from '@env';

import { globalStyle } from '../styles/global.style';
import { darkStyle } from '../styles/darkMode.style';
import { useTranslate } from '../i18n/useTranslate';
import { RootState } from '../services/store/store';
import { AuthRoutesNames, HelloScreenProps } from '../routes/auth';
import GoogleSignIn from '../components/GoogleSignIn';

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
      <View style={styles.centerRow}>
        <Text>{user?.displayName ? user?.displayName : user?.email}</Text>
        <Text variant="titleLarge" style={darkStyle.font}>
          {translate('welcomeScreen.welcome')}
        </Text>
        <Text
          variant="displayMedium"
          style={[darkStyle.font, { fontWeight: 'bold' }]}>
          AniWatchTV
        </Text>
        <View style={[globalStyle.spacerBig]} />
        <Image
          style={styles.logo}
          source={require('../../assets/aniwatch_logo_t.png')}
        />
      </View>
      <View style={styles.stretch}>
        <Button
          mode={'contained'}
          style={[styles.button, globalStyle.marginTopSmall]}
          onPress={() => navigation.navigate(AuthRoutesNames.Login)}>
          {translate('auth.login')}
        </Button>
        <Button
          mode={'contained-tonal'}
          style={[styles.button, globalStyle.marginTopSmall]}
          onPress={() => navigation.navigate(AuthRoutesNames.SignUp)}>
          {translate('auth.register')}
        </Button>
        <Text style={[globalStyle.spacer, styles.textCenter]}>
          {translate('auth.continue_with')}
        </Text>
        <GoogleSignIn />
        {ENV !== 'prod' && (
          <Text>
            api_url: {API_URL}, {ENV}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
  buttons: {
    margin: 16,
  },
  button: {
    maxWidth: 400,
    width: '100%',
    minWidth: 10,
  },
  logo: {
    maxWidth: 200,
    maxHeight: 200,
  },
  stretch: {
    alignItems: 'stretch',
  },
  centerRow: {
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default HelloScreen;
