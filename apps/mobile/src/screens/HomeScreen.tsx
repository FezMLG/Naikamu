import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { API_URL, ENV } from '@env';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { useTranslate } from '../i18n/useTranslate';
import { RootState } from '../services/store/store';
import { HomeScreenProps } from '../routes/main';

const HomeScreen = ({}: HomeScreenProps) => {
  const { translate } = useTranslate();
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <SafeAreaView style={[styles.container]}>
      {ENV !== 'prod' && <Text>api_url: {API_URL}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
  buttons: {
    margin: 16,
  },
  button: {
    maxWidth: 500,
    width: '90%',
    minWidth: 10,
  },
  logo: {
    maxWidth: 200,
    maxHeight: 200,
  },
});

export default HomeScreen;
