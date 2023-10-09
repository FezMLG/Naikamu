import React, { useState } from 'react';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as Sentry from '@sentry/react-native';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

import { useTranslate } from '../i18n/useTranslate';
import { useUserService } from '../services/auth/user.service';
import { colors, defaultRadius, fontStyles } from '../styles';

import { ActivityIndicator } from './atoms';

GoogleSignin.configure({
  webClientId:
    '235555521653-u912a0ccok2j0kmbpv11i4jlpfu29obf.apps.googleusercontent.com',
});

const onGoogleButtonPress = async () => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  Sentry.captureMessage('Start Google sign in');
  const { idToken } = await GoogleSignin.signIn();

  Sentry.captureMessage('Google sign in success');
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  Sentry.captureMessage('Google sign in credential success');

  return auth().signInWithCredential(googleCredential);
};

export function GoogleSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const userService = useUserService();
  const { translate } = useTranslate();

  return (
    <Pressable
      onPress={() =>
        onGoogleButtonPress()
          .then(async () => await userService.setLoggedUser())
          .catch(() => {
            setIsLoading(false);
          })
      }
      onPressIn={() => setIsLoading(true)}
      style={styles.googleLogin}>
      <Image
        source={require('../../assets/google_g_logo.png')}
        style={styles.gLogo}
      />
      <Text style={[colors.textLight, fontStyles.headerSmall]}>
        {translate('auth.continue_with')} Google
      </Text>
      <ActivityIndicator
        size="small"
        style={styles.marginLeft}
        visible={isLoading}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  googleLogin: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderColor: colors.textLight.color,
    borderWidth: 1,
    borderRadius: defaultRadius,
    maxWidth: 500,
    width: '100%',
  },
  marginLeft: {
    marginLeft: 10,
  },
});
