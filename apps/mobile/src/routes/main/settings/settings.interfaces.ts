import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActionType } from '@aniwatch/shared';

export enum SettingsStackScreenNames {
  Settings = 'Settings',
  UserSettings = 'UserSettings',
  SettingsActionConfirm = 'SettingsActionConfirm',
  SettingsAction = 'SettingsAction',
  AppSettings = 'AppSettings',
}

export type SettingsStackParamList = {
  [SettingsStackScreenNames.Settings]: undefined;
  [SettingsStackScreenNames.UserSettings]: undefined;
  [SettingsStackScreenNames.AppSettings]: undefined;
  [SettingsStackScreenNames.SettingsActionConfirm]: {
    action: Function;
    payload: string;
    type: ActionType;
    origin: any;
  };
  [SettingsStackScreenNames.SettingsAction]: {
    action: Function;
    payload?: string;
    requiresLogin: boolean;
    type: ActionType;
    origin: any;
  };
};

export type SettingsStackSettingsScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  SettingsStackScreenNames.Settings
>;

export type SettingsStackUserSettingsScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  SettingsStackScreenNames.UserSettings
>;

export type SettingsStackSettingsActionConfirmScreenProps =
  NativeStackScreenProps<
    SettingsStackParamList,
    SettingsStackScreenNames.SettingsActionConfirm
  >;

export type SettingsStackSettingsActionScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  SettingsStackScreenNames.SettingsAction
>;

export type SettingsStackPlaybackSettingsScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  SettingsStackScreenNames.AppSettings
>;
