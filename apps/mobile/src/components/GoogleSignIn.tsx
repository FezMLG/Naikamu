import React, { useState } from 'react';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Image, Pressable, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { useUserService } from '../services/auth/user.service';
import { defaultRadius } from '../styles';

GoogleSignin.configure({
  webClientId:
    '235555521653-u912a0ccok2j0kmbpv11i4jlpfu29obf.apps.googleusercontent.com',
});

const onGoogleButtonPress = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.error(error);
  }
};

export function GoogleSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const userService = useUserService();

  return (
    <Pressable
      onPress={() =>
        onGoogleButtonPress().then(
          async () => await userService.setLoggedUser(),
        )
      }
      onPressIn={() => setIsLoading(true)}
      style={styles.googleLogin}>
      <Image
        source={require('../../assets/google_g_logo.png')}
        style={styles.gLogo}
      />
      <Text variant="titleSmall">Google</Text>
      {isLoading && (
        <ActivityIndicator size="small" style={styles.marginLeft} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gLogo: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  googleLogin: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'pink',
    borderWidth: 1,
    borderRadius: defaultRadius,
    width: 200,
  },
  marginLeft: {
    marginLeft: 10,
  },
});
