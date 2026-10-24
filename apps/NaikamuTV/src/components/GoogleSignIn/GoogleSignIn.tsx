import React, { useState } from 'react';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { useTranslate } from '../../i18n/useTranslate';
import { useUserService } from '../../services';
import { colors, defaultRadius, fontStyles } from '../../styles';
import { reportError } from '../../utils';
import { ActivityIndicator } from '../atoms';

GoogleSignin.configure({
  webClientId:
    '235555521653-u912a0ccok2j0kmbpv11i4jlpfu29obf.apps.googleusercontent.com',
});

const SIGN_IN_CANCELLED_MESSAGE = 'Google sign in cancelled';

const isSignInCancelled = (error: unknown) => {
  const code = (error as { code?: string } | null)?.code;

  return (
    (error instanceof Error && error.message === SIGN_IN_CANCELLED_MESSAGE) ||
    code === statusCodes.SIGN_IN_CANCELLED ||
    code === statusCodes.IN_PROGRESS
  );
};

const onGoogleButtonPress = async () => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const signInResponse = await GoogleSignin.signIn();

  if (signInResponse.type !== 'success') {
    throw new Error(SIGN_IN_CANCELLED_MESSAGE);
  }

  const googleCredential = GoogleAuthProvider.credential(
    signInResponse.data.idToken,
  );

  return signInWithCredential(getAuth(), googleCredential);
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
            if (!isSignInCancelled(error)) {
              reportError(error);
            }
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
