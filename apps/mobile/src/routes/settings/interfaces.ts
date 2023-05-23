import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActionType } from '@aniwatch/shared';

export enum SettingsScreenNames {
  Settings = 'Settings',
  UserSettings = 'UserSettings',
  SettingsActionConfirm = 'SettingsActionConfirm',
  SettingsAction = 'SettingsAction',
  ProviderSettings = 'ProviderSettings',
  AppSettings = 'AppSettings',
}

export type SettingsStackParamList = {
  [SettingsScreenNames.Settings]: undefined;
  [SettingsScreenNames.UserSettings]: undefined;
  [SettingsScreenNames.ProviderSettings]: undefined;
  [SettingsScreenNames.AppSettings]: undefined;
  [SettingsScreenNames.SettingsActionConfirm]: {
    action: Function;
    payload: string;
    type: ActionType;
  };
  [SettingsScreenNames.SettingsAction]: {
    action: Function;
    requiresLogin: boolean;
    type: ActionType;
  };
};

export type SettingsScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  SettingsScreenNames.Settings
>;

export type UserSettingsScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  SettingsScreenNames.UserSettings
>;

export type ProviderSettingsScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  SettingsScreenNames.ProviderSettings
>;

export type SettingsActionConfirmScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  SettingsScreenNames.SettingsActionConfirm
>;

export type SettingsActionScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  SettingsScreenNames.SettingsAction
>;

export type PlaybackSettingsScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  SettingsScreenNames.AppSettings
>;
