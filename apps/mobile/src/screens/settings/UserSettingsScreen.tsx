import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../services/redux/store';
import { useTranslate } from '../../i18n/useTranslate';
import {
  SettingsScreenNames,
  UserSettingsScreenProps,
} from '../../routes/settings/interfaces';
import {
  useLayout,
  SettingInputs,
  SettingsGroup,
  Button,
} from '../../components';
import { ActionType } from '@aniwatch/shared';
import {
  fireDeleteAccount,
  fireLogoutUser,
  fireUpdatePassword,
  fireUpdateUserDisplayName,
} from '../../services/firebase/fire-auth.service';
import { globalStyle } from '../../styles';

const UserSettingsScreen = ({ navigation }: UserSettingsScreenProps) => {
  const { PageLayout } = useLayout();
  const { user } = useSelector((state: RootState) => state.user);
  const { translate } = useTranslate();
  const dispatch = useAppDispatch();

  return (
    <PageLayout style={[styles.container]}>
      <SettingsGroup title={translate('settings.groups.accountDetails')}>
        <SettingInputs.Edit
          label={translate('forms.labels.' + ActionType.NickChange)}
          text={user?.displayName ?? ''}
          onPress={() =>
            navigation.navigate(SettingsScreenNames.SettingsAction, {
              action: fireUpdateUserDisplayName,
              requiresLogin: false,
              type: ActionType.NickChange,
              origin: SettingsScreenNames.UserSettings,
              payload: user?.displayName!,
            })
          }
          isFirst={true}
        />
        <SettingInputs.Edit
          label={translate('forms.labels.' + ActionType.PasswordChange)}
          text={'*'.repeat(10)}
          onPress={() =>
            navigation.navigate(SettingsScreenNames.SettingsAction, {
              action: fireUpdatePassword,
              requiresLogin: true,
              type: ActionType.PasswordChange,
              origin: SettingsScreenNames.UserSettings,
              payload: '*'.repeat(10),
            })
          }
          isLast={true}
        />
      </SettingsGroup>
      <Button
        label={translate('auth.logout')}
        type={'secondary'}
        style={[globalStyle.marginTopBig, globalStyle.marginBottomBig]}
        onPress={() => dispatch(fireLogoutUser())}
      />
      <SettingsGroup title={translate('settings.groups.dangerZone')}>
        <Button
          label={translate('auth.delete_account')}
          type={'warning'}
          onPress={() =>
            navigation.navigate(SettingsScreenNames.SettingsActionConfirm, {
              action: fireDeleteAccount,
              type: ActionType.AccountDelete,
              origin: SettingsScreenNames.UserSettings,
              payload: '',
            })
          }
        />
      </SettingsGroup>
    </PageLayout>
  );
};

const styles = StyleSheet.create({
  container: {
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
