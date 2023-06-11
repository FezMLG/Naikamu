import React from 'react';
import { Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';

import { colors, fontStyles, globalStyle } from '../styles/global.style';
import { useTranslate } from '../i18n/useTranslate';
import { ActionRequiredScreenProps } from '../routes/auth';
import { Button } from '../components';

const ActionRequiredScreen = ({ navigation }: ActionRequiredScreenProps) => {
  const appVersion = require('../../package.json').version;
  const { translate } = useTranslate();

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
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
          label={translate('important.requireAppUpdate.action')}
          icon="open-in-new"
          type={'primary'}
          onPress={() =>
            Linking.openURL('https://github.com/FezMLG/AniWatch/releases')
          }
        />
        <Button
          label={translate('important.requireAppUpdate.actionAlt')}
          type={'link'}
          onPress={() =>
            Linking.openURL('https://github.com/FezMLG/AniWatch/issues')
          }
        />
        <View style={globalStyle.spacerSmall} />
        <Text style={[globalStyle.textCenter]}>
          app ver.: {appVersion} / {Config.ENV}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
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

export default ActionRequiredScreen;
