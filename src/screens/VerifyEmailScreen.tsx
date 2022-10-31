import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { VerifyEmailScreenProps } from '../routes/auth';
import { RootState, useAppDispatch } from '../services/store/store';
import { fireGetUser } from '../services/firebase/fire-auth.service';

const VerifyEmailScreen = ({ navigation }: VerifyEmailScreenProps) => {
  const [loading, isLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const handleVerify = () => {
    isLoading(true);
    dispatch(fireGetUser());
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <Text>Please verify your email first</Text>
      <Text>{user?.email}</Text>
      <Button loading={loading} onPress={handleVerify} mode={'contained'}>
        Verify
      </Button>
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
