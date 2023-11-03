import React, { useState } from 'react';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import * as Sentry from '@sentry/react-native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { useTranslate } from '../../i18n/useTranslate';
import { useUserService } from '../../services';
import { colors, defaultRadius, fontStyles } from '../../styles';
import { ActivityIndicator } from '../atoms';

GoogleSignin.configure({
  webClientId:
    '235555521653-u912a0ccok2j0kmbpv11i4jlpfu29obf.apps.googleusercontent.com',
});

const onGoogleButtonPress = async () => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  return auth().signInWithCredential(googleCredential);
};

export function GoogleSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const userService = useUserService();
  const { translate } = useTranslate();

  return (
    <Pressable
      onBlur={() => setIsFocus(previous => !previous)}
      onFocus={() => setIsFocus(previous => !previous)}
      onPress={() =>
        onGoogleButtonPress()
          .then(async () => {
            await userService.setLoggedUser();
          })
          .catch(error => {
            // Sentry.captureException(error);
            setIsLoading(false);
          })
      }
      onPressIn={() => setIsLoading(true)}
      style={[
        {
          borderRadius: defaultRadius,
        },
        isFocus
          ? { backgroundColor: colors.onBackground.color }
          : { backgroundColor: 'transparent' },
      ]}>
      <View style={[styles.googleLogin]}>
        {isLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Image
            source={require('../../assets/google_g_logo.png')}
            style={styles.gLogo}
          />
        )}
        <Text
          style={[
            isFocus ? colors.textDark : colors.textLight,
            fontStyles.headerSmall,
          ]}>
          {translate('auth.continue_with')} Google
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gLogo: {
    width: 30,
    height: 30,
  },
  googleLogin: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderColor: colors.textLight.color,
    borderWidth: 1,
    borderRadius: defaultRadius,
    width: 300,
  },
});
