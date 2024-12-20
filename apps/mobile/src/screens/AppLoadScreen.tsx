import React, { useEffect, useState } from 'react';

import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { default as Config } from 'react-native-config';

import Logo from '../../assets/logo_full.svg';
import { ActivityIndicator, EnvironmentDebug, PageLayout } from '../components';
import { useTranslate } from '../i18n/useTranslate';
import { useAppLoadService } from '../services';
import { useLayoutMessageService } from '../services/layout-info';
import { colors, fontStyles, globalStyle } from '../styles';

export function AppLoadScreen() {
  const { translate } = useTranslate();
  const [apiError, setApiError] = useState(false);
  const { initialize } = useAppLoadService();

  useEffect(() => {
    (async () => {
      await initialize();

      setTimeout(() => {
        setApiError(true);
      }, 15_000);
    })();
  }, []);

  return (
    <PageLayout.Default style={[styles.container]}>
      <EnvironmentDebug
        style={[
          {
            width: '90%',
          },
        ]}>
        <Logo style={styles.logo} width="90%" />
      </EnvironmentDebug>
      <View style={[globalStyle.spacer]} />
      <ActivityIndicator size="large" visible={true} />
      {apiError && (
        <Pressable
          onPress={() =>
            Linking.openURL('https://github.com/FezMLG/Naikamu/issues')
          }
          style={styles.centerBox}>
          <Text
            style={[
              fontStyles.paragraph,
              colors.error,
              globalStyle.textCenter,
            ]}>
            {translate('welcomeScreen.apiError')}
          </Text>
          <Text
            style={[
              fontStyles.paragraph,
              fontStyles.underline,
              globalStyle.textCenter,
              colors.textLight,
            ]}>
            {translate('welcomeScreen.apiContact')}
          </Text>
        </Pressable>
      )}
      {Config.ENV !== 'production' && (
        <Text style={[fontStyles.paragraph, colors.textLight]}>
          api_url: {Config.API_URL}
        </Text>
      )}
    </PageLayout.Default>
  );
}

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
    alignSelf: 'center',
    width: '90%',
  },
  centerBox: {
    alignItems: 'center',
  },
});
