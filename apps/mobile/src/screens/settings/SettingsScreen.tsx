import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../services/store/store';
import { useTranslate } from '../../i18n/useTranslate';
import { globalStyle } from '../../styles/global.style';
import { fireLogoutUser } from '../../services/firebase/fire-auth.service';
import { ProgressiveImage } from '../../components/ProgressiveImage';
import {
  SettingsScreenNames,
  SettingsScreenProps,
} from '../../routes/settings/interfaces';
import Config from 'react-native-config';
import { Button, SectionButton } from '../../components';

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const { translate } = useTranslate();

  return (
    <SafeAreaView style={[styles.container]}>
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
          onPress={() => navigation.navigate(SettingsScreenNames.UserSettings)}
        />
        <SectionButton
          title={translate('settings.categories.AppSettings')}
          icon={'cog'}
          onPress={() => navigation.navigate(SettingsScreenNames.AppSettings)}
        />
      </View>
      <Button
        label={translate('auth.logout')}
        type={'secondary'}
        style={[styles.center, globalStyle.marginTopBig]}
        onPress={() => dispatch(fireLogoutUser())}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  center: {
    alignSelf: 'center',
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

export default SettingsScreen;
