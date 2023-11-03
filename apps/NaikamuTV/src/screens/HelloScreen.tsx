import React, { useEffect } from 'react';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { default as Config } from 'react-native-config';

import Logo from '../assets/logo.svg';
import { GoogleSignIn } from '../components';
import { useTranslate } from '../i18n/useTranslate';
import { AuthStackHelloScreenProps } from '../routes';

export function HelloScreen({ navigation }: AuthStackHelloScreenProps) {
  const { translate } = useTranslate();

  useEffect(() => {
    navigation.addListener('beforeRemove', element => {
      element.preventDefault();
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <View
        style={{
          justifyContent: 'center',
          height: '50%',
        }}>
        <Logo style={styles.logo} width="90%" />
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          height: '50%',
        }}>
        <GoogleSignIn />
        {Config.ENV !== 'production' && <Text>api_url: {Config.API_URL}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
  },
  logo: {
    alignSelf: 'center',
    width: '90%',
  },
});
