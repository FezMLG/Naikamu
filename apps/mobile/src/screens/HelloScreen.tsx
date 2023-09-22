import React, { useEffect } from 'react';

import { Image, StyleSheet, View } from 'react-native';
import { default as Config } from 'react-native-config';
import { Text } from 'react-native-paper';

import { Button, PageLayout, useLayout, GoogleSignIn } from '../components';
import { useTranslate } from '../i18n/useTranslate';
import { AuthStackRoutesNames, AuthStackHelloScreenProps } from '../routes';
import { useUserStore } from '../services/auth/user.store';
import { darkStyle, globalStyle } from '../styles';

export function HelloScreen({ navigation }: AuthStackHelloScreenProps) {
  const { translate } = useTranslate();
  const user = useUserStore(state => state.user);
  const layout = useLayout();

  useEffect(() => {
    navigation.addListener('beforeRemove', element => {
      element.preventDefault();
    });
  }, [navigation]);

  return (
    <PageLayout.Default style={[styles.container]} {...layout}>
      <Text>{user?.displayName ?? user?.email}</Text>
      <Text style={darkStyle.font} variant="titleLarge">
        {translate('welcomeScreen.welcome')}
      </Text>
      <Text
        style={[darkStyle.font, { fontWeight: 'bold' }]}
        variant="displayMedium">
        AniWatch
      </Text>
      <View style={[globalStyle.spacerBig]} />
      <Image
        /* eslint-disable-next-line unicorn/prefer-module */
        source={require('../../assets/aniwatch_logo_t.png')}
        style={styles.logo}
      />
      <View style={[globalStyle.spacerBig]} />
      <GoogleSignIn />
      <View style={globalStyle.spacer} />
      <Button
        label={translate('auth.login')}
        onPress={() => navigation.navigate(AuthStackRoutesNames.Login)}
        type="primary"
      />
      <Button
        label={translate('auth.register')}
        onPress={() => navigation.navigate(AuthStackRoutesNames.SignUp)}
        style={[globalStyle.marginTopSmall]}
        type="secondary"
      />
      {Config.ENV !== 'prod' && <Text>api_url: {Config.API_URL}</Text>}
    </PageLayout.Default>
  );
}

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
