import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useTranslate } from '../../i18n/useTranslate';
import { globalStyle } from '../../styles';
import {
  PageLayout,
  SectionButton,
  useLayout,
  ProgressiveImage,
} from '../../components';
import { useUserStore } from '../../services/auth/user.store';
import {
  SettingsStackScreenNames,
  SettingsStackSettingsScreenProps,
} from '../../routes';

export const SettingsScreen = ({
  navigation,
}: SettingsStackSettingsScreenProps) => {
  const layout = useLayout();
  const user = useUserStore(state => state.user);
  const { translate } = useTranslate();

  return (
    <PageLayout.Default style={[styles.container]} {...layout}>
      <View>
        {user?.picture ? (
          <ProgressiveImage source={user.picture} style={[styles.logo]} />
        ) : (
          <Image
            style={styles.logo}
            source={require('../../../assets/anya.jpeg')}
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
      <View>
        <SectionButton
          title={translate('settings.categories.UserSettings')}
          icon={'account-cog'}
          onPress={() =>
            navigation.navigate(SettingsStackScreenNames.UserSettings)
          }
        />
        <SectionButton
          title={translate('settings.categories.AppSettings')}
          icon={'cog'}
          onPress={() =>
            navigation.navigate(SettingsStackScreenNames.AppSettings)
          }
        />
      </View>
    </PageLayout.Default>
  );
};

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
