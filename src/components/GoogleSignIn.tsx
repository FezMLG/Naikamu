import React from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Image, Pressable, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

import { fireGetUser } from '../services/firebase/fire-auth.service';
import { useAppDispatch } from '../services/store/store';
import { Text } from 'react-native-paper';
import { defaultRadius } from '../styles/global.style';

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

const GoogleSignIn = () => {
  const dispatch = useAppDispatch();
  return (
    <Pressable
      style={styles.googleLogin}
      onPress={() => onGoogleButtonPress().then(() => dispatch(fireGetUser()))}>
      <Image
        style={styles.gLogo}
        source={require('../../assets/google_g_logo.png')}
      />
      <Text variant="titleSmall">Google</Text>
    </Pressable>
  );
};

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
});

export default GoogleSignIn;
