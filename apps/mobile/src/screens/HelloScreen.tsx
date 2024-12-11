import React, { useEffect } from 'react';

import { StyleSheet, View } from 'react-native';
import { default as Config } from 'react-native-config';
import { Text } from 'react-native-paper';

import Logo from '../../assets/logo_full.svg';
import { Button, PageLayout, GoogleSignIn } from '../components';
import { useTranslate } from '../i18n/useTranslate';
import { AuthStackRoutesNames, AuthStackHelloScreenProps } from '../routes';
import { globalStyle } from '../styles';

export function HelloScreen({ navigation }: AuthStackHelloScreenProps) {
  const { translate } = useTranslate();

  useEffect(() => {
    navigation.addListener('beforeRemove', element => {
      element.preventDefault();
    });
  }, [navigation]);

  return (
    <PageLayout.Default style={[styles.container]}>
      <View
        style={{
          justifyContent: 'center',
          height: '50%',
        }}>
        <Logo style={styles.logo} width="90%" />
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          height: '50%',
        }}>
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
        {Config.ENV !== 'production' && <Text>api_url: {Config.API_URL}</Text>}
      </View>
    </PageLayout.Default>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
  },
  logo: {
    alignSelf: 'center',
    width: '90%',
  },
});
