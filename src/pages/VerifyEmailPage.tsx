import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Text } from 'react-native-paper';

const SplashPage = () => {
  useEffect(() => {});

  return (
    <SafeAreaView style={[styles.container]}>
      <Text>Please verify your email first</Text>
      <ActivityIndicator />
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

export default SplashPage;
