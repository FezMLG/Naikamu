import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../services/store/store';
import { useTranslate } from '../../i18n/useTranslate';
import {
  SettingsScreenNames,
  UserSettingsScreenProps,
} from '../../routes/settings/interfaces';
import { SettingInputs, SettingsGroup } from '../../components';
import { ActionType } from '@aniwatch/shared';
import {
  fireUpdatePassword,
  fireUpdateUserDisplayName,
} from '../../services/firebase/fire-auth.service';

const UserSettingsScreen = ({ navigation }: UserSettingsScreenProps) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { translate } = useTranslate();

  return (
    <SafeAreaView style={[styles.container]}>
      <SettingsGroup title={'Account Details'}>
        <SettingInputs.Edit
          label={'Nickname'}
          text={user?.displayName ?? ''}
          onPress={() =>
            navigation.navigate(SettingsScreenNames.SettingsAction, {
              action: fireUpdateUserDisplayName,
              requiresLogin: false,
              type: ActionType.NickChange,
            })
          }
        />
        <SettingInputs.Edit
          label={'Password'}
          text={'*'.repeat(10)}
          onPress={() =>
            navigation.navigate(SettingsScreenNames.SettingsAction, {
              action: fireUpdatePassword,
              requiresLogin: true,
              type: ActionType.PasswordChange,
            })
          }
        />
      </SettingsGroup>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: 16,
    alignItems: 'center',
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

export default UserSettingsScreen;
