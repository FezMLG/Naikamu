import React from 'react';

import analytics from '@react-native-firebase/analytics';
import { Linking, Platform, View } from 'react-native';

import { PageLayout, SectionButton, useLayout } from '../../components';
import { externalLinks } from '../../externalLinks.ts';
import { useTranslate } from '../../i18n/useTranslate';
import { SettingsStackHelpSettingsScreenProps } from '../../routes';
import { useUserStore } from '../../services/auth/user.store.ts';
import { globalStyle } from '../../styles';

export function HelpSettingsScreen({}: SettingsStackHelpSettingsScreenProps) {
  const { translate } = useTranslate();
  const user = useUserStore(state => state.user);
  const layout = useLayout();

  return (
    <PageLayout.Default {...layout}>
      <View style={globalStyle.marginTop}>
        <SectionButton
          external
          icon="help"
          onPress={async () => {
            await analytics().logEvent('help_center', {
              user: user?.uid,
              source: 'app-settings',
              device: 'mobile',
              os: Platform.OS,
            });
            await Linking.openURL(externalLinks.guides);
          }}
          title={translate('centrum pomocy')}
        />
        <SectionButton
          external
          icon="test-tube"
          onPress={async () => {
            await analytics().logEvent('beta_test_join', {
              user: user?.uid,
              source: 'app-settings',
              device: 'mobile',
              os: Platform.OS,
            });
            await Linking.openURL(externalLinks.beta);
          }}
          title={translate('dołącz do beta testów')}
        />
        <SectionButton
          external
          logo={require('../../../assets/kofi_logo.png')}
          onPress={async () => {
            await analytics().logEvent('kofi_donation', {
              user: user?.uid,
              source: 'app-settings',
              device: 'mobile',
              os: Platform.OS,
            });
            await Linking.openURL(externalLinks.koFi);
          }}
          title={translate('wesprzyj nas')}
        />
      </View>
    </PageLayout.Default>
  );
}
