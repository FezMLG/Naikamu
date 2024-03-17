import React from 'react';

import { Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { default as Config } from 'react-native-config';

import * as packageJson from '../../package.json';
import { Button } from '../components';
import { useTranslate } from '../i18n/useTranslate';
import { AuthStackActionRequiredScreenProps } from '../routes';
import { colors, fontStyles, globalStyle } from '../styles';

export function ActionRequiredScreen({
  navigation,
}: AuthStackActionRequiredScreenProps) {
  const appVersion = packageJson.version;
  const apiVersion = packageJson.apiVersion;

  const { translate } = useTranslate();

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', event => {
        event.preventDefault();
      }),
    [navigation],
  );

  return (
    <SafeAreaView style={[styles.container]}>
      <View>
        <Text style={[colors.textLight, fontStyles.screenHeader]}>
          {translate('important.requireAppUpdate.title')}
        </Text>
        <View style={[globalStyle.spacer]} />
        <Text style={[colors.textLight, fontStyles.headerSmall]}>
          {translate('important.requireAppUpdate.message')}
        </Text>
      </View>
      <View>
        <Button
          icon="open-in-new"
          label={translate('important.requireAppUpdate.action')}
          onPress={() => Linking.openURL('https://naikamu.com/download.html')}
          type="primary"
        />
        <View style={globalStyle.spacerSmall} />
        <Text
          style={[globalStyle.textCenter, fontStyles.label, colors.textLight]}>
          app ver.: {appVersion} / {Config.ENV} / {apiVersion}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginHorizontal: 16,
  },
  buttons: {
    margin: 16,
  },
  logo: {
    maxWidth: 200,
    maxHeight: 200,
  },
  centerBox: {
    alignItems: 'center',
  },
});
