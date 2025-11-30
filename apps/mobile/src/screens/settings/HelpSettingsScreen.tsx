import React from 'react';

import analytics from '@react-native-firebase/analytics';
import { Alert, Linking, Platform, Text, View } from 'react-native';
import Share, { ShareSingleOptions, Social } from 'react-native-share';
import * as Sharing from 'expo-sharing';

import { PageLayout, SectionButton } from '../../components';
import { externalLinks } from '../../externalLinks';
import { useTranslate } from '../../i18n/useTranslate';
import { SettingsStackHelpSettingsScreenProps } from '../../routes';
import { useUserStore } from '../../services/auth/user.store';
import { globalStyle } from '../../styles';
import { getAllLogFiles, getTodayLogFile } from '../../utils';

export function HelpSettingsScreen({}: SettingsStackHelpSettingsScreenProps) {
  const { translate } = useTranslate();
  const user = useUserStore(state => state.user);

  return (
    <PageLayout.Default>
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
        <Text>
          To report an issue, please click the button and send an email with
          what the issue is, to contact@naikamu.com with the logs attached.
        </Text>
        <SectionButton
          external
          icon="email-fast-outline"
          onPress={async () => {
            await analytics().logEvent('email_issue', {
              user: user?.uid,
              source: 'app-settings',
              device: 'mobile',
              os: Platform.OS,
            });

            try {
              const path = await getTodayLogFile();

              if (!path) {
                // No log file, fallback to regular email link
                await Linking.openURL(externalLinks.email);

                return;
              }

              await Sharing.shareAsync(`file://${path}`, {
                mimeType: 'text/plain',
                dialogTitle: 'Naikamu App Issue',
                UTI: 'public.plain-text',
              });
            } catch (error) {
              console.error('Failed to share logs:', error);
              Alert.alert(
                'Error',
                'Failed to attach logs. Opening email without logs.',
                [
                  {
                    text: 'OK',
                    onPress: () => Linking.openURL(externalLinks.email),
                  },
                ],
              );
            }
          }}
          title={translate('settings.emailIssue')}
        />
        <SectionButton
          external
          icon="email-fast-outline"
          onPress={async () => {
            await analytics().logEvent('email_feedback', {
              user: user?.uid,
              source: 'app-settings',
              device: 'mobile',
              os: Platform.OS,
            });

            await Share.open({
              title: 'Naikamu App Feedback',
              subject: 'Naikamu App Feedback',
              email: 'contact@naikamu.com',
              failOnCancel: false,
            });
          }}
          title={translate('settings.emailFeedback')}
        />
      </View>
    </PageLayout.Default>
  );
}
