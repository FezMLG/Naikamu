import React from 'react';

import { ActionType } from '@aniwatch/shared';
import { StyleSheet } from 'react-native';

import {
  useLayout,
  SettingInputs,
  SettingsGroup,
  Button,
  PageLayout,
} from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import {
  SettingsStackScreenNames,
  SettingsStackUserSettingsScreenProps,
} from '../../routes';
import { useUserService } from '../../services/auth/user.service';
import { useUserStore } from '../../services/auth/user.store';
import { globalStyle } from '../../styles';

export function UserSettingsScreen({
  navigation,
}: SettingsStackUserSettingsScreenProps) {
  const layout = useLayout();
  const user = useUserStore(state => state.user);
  const { translate } = useTranslate();
  const userService = useUserService();

  return (
    <PageLayout.Default style={[styles.container]} {...layout}>
      <SettingsGroup title={translate('settings.groups.accountDetails')}>
        <SettingInputs.Edit
          isFirst={true}
          label={translate('forms.labels.' + ActionType.NickChange)}
          onPress={() =>
            navigation.navigate(SettingsStackScreenNames.SettingsAction, {
              action: userService.updateUserDisplayName,
              requiresLogin: false,
              type: ActionType.NickChange,
              origin: SettingsStackScreenNames.UserSettings,
              payload: user?.displayName!,
            })
          }
          text={user?.displayName ?? ''}
        />
        <SettingInputs.Edit
          isLast={true}
          label={translate('forms.labels.' + ActionType.PasswordChange)}
          onPress={() =>
            navigation.navigate(SettingsStackScreenNames.SettingsAction, {
              action: userService.updateUserPassword,
              requiresLogin: true,
              type: ActionType.PasswordChange,
              origin: SettingsStackScreenNames.UserSettings,
              payload: '*'.repeat(10),
            })
          }
          text={'*'.repeat(10)}
        />
      </SettingsGroup>
      <Button
        label={translate('auth.logout')}
        onPress={() => userService.logoutUser()}
        style={[globalStyle.marginTopBig, globalStyle.marginBottomBig]}
        type="secondary"
      />
      <SettingsGroup title={translate('settings.groups.dangerZone')}>
        <Button
          label={translate('auth.delete_account')}
          onPress={() =>
            navigation.navigate(
              SettingsStackScreenNames.SettingsActionConfirm,
              {
                action: userService.deleteUserAccount,
                type: ActionType.AccountDelete,
                origin: SettingsStackScreenNames.UserSettings,
                payload: '',
              },
            )
          }
          type="warning"
        />
      </SettingsGroup>
    </PageLayout.Default>
  );
}

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
