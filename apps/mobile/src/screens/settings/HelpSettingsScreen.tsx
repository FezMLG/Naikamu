import React from 'react';

import analytics from '@react-native-firebase/analytics';
import * as Sharing from 'expo-sharing';
import { Alert, Linking, Platform, Text, View } from 'react-native';
import Share from 'react-native-share';

import { PageLayout, SectionButton } from '../../components';
import { externalLinks } from '../../externalLinks';
import { useTranslate } from '../../i18n/useTranslate';
import { SettingsStackHelpSettingsScreenProps } from '../../routes';
import { useUserStore } from '../../services/auth/user.store';
import { colors, fontStyles, globalStyle } from '../../styles';
import { getTodayLogFile } from '../../utils';

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
              email: externalLinks.emailAddress,
              failOnCancel: false,
            });
          }}
          title={translate('settings.emailFeedback')}
        />
        <View style={globalStyle.marginTopBig}>
          <Text style={[fontStyles.normal, colors.textLighter]}>
            {translate('settings.emailIssueText')} {externalLinks.emailAddress}.
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
        </View>
      </View>
    </PageLayout.Default>
  );
}
