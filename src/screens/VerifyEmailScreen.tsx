import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Text } from 'react-native-paper';

import { VerifyEmailPageProps } from '../routes/auth';

const VerifyEmailScreen = ({}: VerifyEmailPageProps) => {
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

export default VerifyEmailScreen;
