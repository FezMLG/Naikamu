import React from 'react';

import analytics from '@react-native-firebase/analytics';
import { Linking, Platform, View } from 'react-native';

import { PageLayout, SectionButton, useLayout } from '../../components';
import { externalLinks } from '../../externalLinks';
import { useTranslate } from '../../i18n/useTranslate';
import { SettingsStackHelpSettingsScreenProps } from '../../routes';
import { useUserStore } from '../../services/auth/user.store';
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
          icon="help-circle-outline"
          onPress={async () => {
            await analytics().logEvent('help_center', {
              user: user?.uid,
              source: 'app-settings',
              device: 'mobile',
              os: Platform.OS,
            });
            await Linking.openURL(externalLinks.guides.getStarted);
          }}
          title={translate('settings.helpCenter')}
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

            if (Platform.OS === 'ios') {
              await Linking.openURL(externalLinks.beta.ios);
            } else if (Platform.OS === 'android') {
              await Linking.openURL(externalLinks.beta.android);
            }
          }}
          title={translate('settings.beta')}
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
          title={translate('settings.donation')}
        />
        <SectionButton
          external
          icon="email-fast-outline"
          onPress={async () => {
            await analytics().logEvent('email_contact', {
              user: user?.uid,
              source: 'app-settings',
              device: 'mobile',
              os: Platform.OS,
            });
            await Linking.openURL(externalLinks.email);
          }}
          title={translate('settings.contact')}
        />
      </View>
    </PageLayout.Default>
  );
}
