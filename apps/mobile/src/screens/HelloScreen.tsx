import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Config from 'react-native-config';

import { globalStyle } from '../styles/global.style';
import { darkStyle } from '../styles/darkMode.style';
import { useTranslate } from '../i18n/useTranslate';
import { AuthRoutesNames, HelloScreenProps } from '../routes/auth';
import GoogleSignIn from '../components/GoogleSignIn';
import { Button, PageLayout, useLayout } from '../components';
import { useUserStore } from '../services/auth/user.store';

const HelloScreen = ({ navigation }: HelloScreenProps) => {
  const { translate } = useTranslate();
  const user = useUserStore(state => state.user);
  const layout = useLayout();

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }, [navigation]);

  return (
    <PageLayout.Default style={[styles.container]} {...layout}>
      <Text>{user?.displayName ? user?.displayName : user?.email}</Text>
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
      <GoogleSignIn />
      <Text style={globalStyle.spacer}>{translate('auth.continue_with')}</Text>
      <Button
        label={translate('auth.login')}
        type={'primary'}
        onPress={() => navigation.navigate(AuthRoutesNames.Login)}
      />
      <Button
        label={translate('auth.register')}
        type={'secondary'}
        onPress={() => navigation.navigate(AuthRoutesNames.SignUp)}
        style={[globalStyle.marginTopSmall]}
      />
      {Config.ENV !== 'prod' && <Text>api_url: {Config.API_URL}</Text>}
    </PageLayout.Default>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
  logo: {
    maxWidth: 200,
    maxHeight: 200,
  },
});

export default HelloScreen;
