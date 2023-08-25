import { StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from '../components';

export const SplashScreen = () => {
  return (
    <SafeAreaView style={[styles.container]}>
      <ActivityIndicator size={'large'} visible={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    maxWidth: 200,
    maxHeight: 200,
  },
});
