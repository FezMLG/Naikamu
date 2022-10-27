import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { API_URL, ENV } from '@env';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalStyle } from '../styles/global.style';
import { FocusButton } from '../components/FocusButton';
import { darkStyle } from '../styles/darkMode.style';
import { HomePageProps, RoutesNames } from '../routes/interfaces';
import { useTranslate } from '../i18n/useTranslate';
import { useAppDispatch } from '../services/store/store';
import { logoutUser } from '../services/auth.service';

const HomePage = ({ navigation }: HomePageProps) => {
  const { translate } = useTranslate();
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={[styles.container]}>
      <Text variant="titleLarge" style={darkStyle.font}>
        {translate('welcomeScreen.welcome')}
      </Text>
      <Text
        variant="displayMedium"
        style={[darkStyle.font, { fontWeight: 'bold' }]}>
        AniWatch
      </Text>
      <View style={[globalStyle.spacerBig]} />
      <Image
        style={styles.logo}
        source={require('../../assets/aniwatch_logo_t.png')}
      />
      <View style={[globalStyle.spacerBig]} />
      <FocusButton
        onPress={() => navigation.navigate(RoutesNames.Browse)}
        style={[]}>
        <Text
          variant="titleLarge"
          style={[darkStyle.fontReverse, darkStyle.font]}>
          {translate('welcomeScreen.cto')}
        </Text>
      </FocusButton>
      <Button onPress={() => dispatch(logoutUser())}>Logout</Button>
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
  logo: {
    maxWidth: 200,
    maxHeight: 200,
  },
});

export default HomePage;
