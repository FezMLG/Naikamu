import React, { useState } from 'react';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as Sentry from '@sentry/react-native';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

import { useTranslate } from '../../i18n/useTranslate';
import { useUserService } from '../../services/auth/user.service';
import { useLayoutMessageService } from '../../services/layout-info';
import { colors, defaultRadius, fontStyles } from '../../styles';
import { ActivityIndicator } from '../atoms';

GoogleSignin.configure({
  webClientId:
    '235555521653-u912a0ccok2j0kmbpv11i4jlpfu29obf.apps.googleusercontent.com',
});

const onGoogleButtonPress = async () => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const signInResponse = await GoogleSignin.signIn();

  if (signInResponse.type === 'success') {
    const { idToken } = signInResponse.data;
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return {
      type: 'success',
      data: auth().signInWithCredential(googleCredential),
    };
  } else if (signInResponse.type === 'cancelled') {
    return signInResponse;
  }

  throw new Error('Google sign in failed, unknown error', signInResponse);
};

export function GoogleSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const userService = useUserService();
  const { setAndShowMessage } = useLayoutMessageService();
  const { translate } = useTranslate();

  return (
    <Pressable
      onPress={() =>
        onGoogleButtonPress()
          .then(async response => {
            if (response.type === 'success') {
              userService.setLoggedUser();
            } else if (response.type === 'cancelled') {
              setAndShowMessage(translate('auth.google_sign_in_cancelled'));
              setIsLoading(false);
            }
          })
          .catch(error => {
            Sentry.captureException(error);
            setAndShowMessage(translate('auth.google_sign_in_error'));
            setIsLoading(false);
          })
      }
      onPressIn={() => setIsLoading(true)}
      style={styles.googleLogin}>
      <Image
        source={require('../../../assets/google_g_logo.png')}
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
    height: 50,
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
