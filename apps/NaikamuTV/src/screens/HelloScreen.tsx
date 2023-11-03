import React, { useEffect } from 'react';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { default as Config } from 'react-native-config';

import Logo from '../assets/logo.svg';
import { GoogleSignIn } from '../components';
import { AuthStackHelloScreenProps } from '../routes';

export function HelloScreen({ navigation }: AuthStackHelloScreenProps) {
  useEffect(() => {
    navigation.addListener('beforeRemove', element => {
      element.preventDefault();
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          height: '50%',
          width: '100%',
        }}>
        <Logo style={styles.logo} width="90%" />
      </View>
      <View
        style={{
          justifyContent: 'center',
          height: '50%',
          alignSelf: 'center',
        }}>
        <GoogleSignIn />
        {Config.ENV !== 'production' && <Text>api_url: {Config.API_URL}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    alignSelf: 'center',
    width: '90%',
  },
});
