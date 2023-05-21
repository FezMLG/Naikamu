import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActionType } from '@aniwatch/shared';

export enum SettingsScreenNames {
  Settings = 'Settings',
  UserSettings = 'UserSettings',
  SettingsActionConfirm = 'SettingsActionConfirm',
  DangerSettings = 'DangerSettings',
  ProviderSettings = 'ProviderSettings',
  AppSettings = 'AppSettings',
}

export type SettingsStackParamList = {
  [SettingsScreenNames.Settings]: undefined;
  [SettingsScreenNames.UserSettings]: undefined;
  [SettingsScreenNames.DangerSettings]: undefined;
  [SettingsScreenNames.ProviderSettings]: undefined;
  [SettingsScreenNames.AppSettings]: undefined;
  [SettingsScreenNames.SettingsActionConfirm]: {
    action: () => void;
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

export type DangerSettingsScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  SettingsScreenNames.DangerSettings
>;

export type ProviderSettingsScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  SettingsScreenNames.ProviderSettings
>;

export type SettingsActionConfirmScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  SettingsScreenNames.SettingsActionConfirm
>;

export type PlaybackSettingsScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  SettingsScreenNames.AppSettings
>;
