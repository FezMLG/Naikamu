import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootState, useAppDispatch } from '../services/store/store';
import { useSelector } from 'react-redux';
import { CreateSessionPageProps } from '../routes/auth';

const CreateSessionScreen = ({ navigation }: CreateSessionPageProps) => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {});

  return (
    <SafeAreaView style={[styles.container]}>
      <ActivityIndicator size={'large'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    margin: 16,
  },
  logo: {
    maxWidth: 200,
    maxHeight: 200,
  },
});

export default CreateSessionScreen;
