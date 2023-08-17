import React from 'react';
import { StyleSheet } from 'react-native';

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
  PageLayout,
} from '../../components';
import { ActionType } from '@aniwatch/shared';
import { globalStyle } from '../../styles';
import { useUserStore } from '../../services/auth/user.store';
import { useUserService } from '../../services/auth/user.service';

const UserSettingsScreen = ({ navigation }: UserSettingsScreenProps) => {
  const layout = useLayout();
  const user = useUserStore(state => state.user);
  const { translate } = useTranslate();
  const userService = useUserService();

  return (
    <PageLayout.Default style={[styles.container]} {...layout}>
      <SettingsGroup title={translate('settings.groups.accountDetails')}>
        <SettingInputs.Edit
          label={translate('forms.labels.' + ActionType.NickChange)}
          text={user?.displayName ?? ''}
          onPress={() =>
            navigation.navigate(SettingsScreenNames.SettingsAction, {
              action: userService.updateUserDisplayName,
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
              action: userService.updateUserPassword,
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
        onPress={() => userService.logoutUser()}
      />
      <SettingsGroup title={translate('settings.groups.dangerZone')}>
        <Button
          label={translate('auth.delete_account')}
          type={'warning'}
          onPress={() =>
            navigation.navigate(SettingsScreenNames.SettingsActionConfirm, {
              action: userService.deleteUserAccount,
              type: ActionType.AccountDelete,
              origin: SettingsScreenNames.UserSettings,
              payload: '',
            })
          }
        />
      </SettingsGroup>
    </PageLayout.Default>
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
