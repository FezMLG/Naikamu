import React from 'react';

import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import {
  PageLayout,
  SectionButton,
  ProgressiveImage,
  CheckForUpdates,
  Hidden,
} from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import {
  SettingsStackScreenNames,
  SettingsStackSettingsScreenProps,
} from '../../routes';
import { useUserStore } from '../../services/auth/user.store';
import { globalStyle } from '../../styles';

export function SettingsScreen({
  navigation,
}: SettingsStackSettingsScreenProps) {
  const user = useUserStore(state => state.user);
  const { translate } = useTranslate();

  return (
    <PageLayout.Default style={[styles.container]}>
      <ScrollView>
        <View>
          {user?.picture ? (
            <ProgressiveImage source={user.picture} style={[styles.logo]} />
          ) : (
            <Image
              /* eslint-disable-next-line unicorn/prefer-module */
              source={require('../../../assets/anya.jpeg')}
              style={styles.logo}
            />
          )}
          <Text
            style={[styles.textCenter, globalStyle.marginTop]}
            variant="titleLarge">
            {user?.displayName}
          </Text>
          <Text style={styles.textCenter} variant="titleMedium">
            {user?.email}
          </Text>
        </View>
        <View style={globalStyle.marginTop}>
          <SectionButton
            icon="account-cog"
            onPress={() =>
              navigation.navigate(SettingsStackScreenNames.UserSettings)
            }
            title={translate('settings.categories.UserSettings')}
          />
          <SectionButton
            icon="cog"
            onPress={() =>
              navigation.navigate(SettingsStackScreenNames.AppSettings)
            }
            title={translate('settings.categories.AppSettings')}
          />
          {/*<Hidden>*/}
          {/*  <SectionButton*/}
          {/*    icon="earth"*/}
          {/*    onPress={() =>*/}
          {/*      navigation.navigate(*/}
          {/*        SettingsStackScreenNames.ExternalServicesSettings,*/}
          {/*      )*/}
          {/*    }*/}
          {/*    title={translate('settings.categories.ExternalServicesSettings')}*/}
          {/*  />*/}
          {/*</Hidden>*/}
          <SectionButton
            icon="help-circle-outline"
            onPress={() =>
              navigation.navigate(SettingsStackScreenNames.HelpSettings)
            }
            title={translate('settings.categories.HelpSettings')}
          />
        </View>
        <View style={globalStyle.marginTopBig}>
          <CheckForUpdates />
        </View>
      </ScrollView>
    </PageLayout.Default>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: 'cover',
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  highlight: {
    fontWeight: 'bold',
  },
  textInput: {},
  formInputs: {
    alignItems: 'center',
  },
  width90: {
    maxWidth: 500,
    width: '90%',
    minWidth: 10,
  },
  textCenter: {
    textAlign: 'center',
  },
});
