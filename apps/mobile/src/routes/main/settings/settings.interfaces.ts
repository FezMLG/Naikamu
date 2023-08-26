import { ActionType } from '@aniwatch/shared';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum SettingsStackScreenNames {
  Settings = 'Settings',
  UserSettings = 'UserSettings',
  SettingsActionConfirm = 'SettingsActionConfirm',
  SettingsAction = 'SettingsAction',
  AppSettings = 'AppSettings',
}

export type SettingsStackParameterList = {
  [SettingsStackScreenNames.Settings]: undefined;
  [SettingsStackScreenNames.UserSettings]: undefined;
  [SettingsStackScreenNames.AppSettings]: undefined;
  [SettingsStackScreenNames.SettingsActionConfirm]: {
    action: (payload: string) => void;
    payload: string;
    type: ActionType;
    origin: any;
  };
  [SettingsStackScreenNames.SettingsAction]: {
    action: (payload: string) => void;
    payload?: string;
    requiresLogin: boolean;
    type: ActionType;
    origin: any;
  };
};

export type SettingsStackSettingsScreenProps = NativeStackScreenProps<
  SettingsStackParameterList,
  SettingsStackScreenNames.Settings
>;

export type SettingsStackUserSettingsScreenProps = NativeStackScreenProps<
  SettingsStackParameterList,
  SettingsStackScreenNames.UserSettings
>;

export type SettingsStackSettingsActionConfirmScreenProps =
  NativeStackScreenProps<
    SettingsStackParameterList,
    SettingsStackScreenNames.SettingsActionConfirm
  >;

export type SettingsStackSettingsActionScreenProps = NativeStackScreenProps<
  SettingsStackParameterList,
  SettingsStackScreenNames.SettingsAction
>;

export type SettingsStackPlaybackSettingsScreenProps = NativeStackScreenProps<
  SettingsStackParameterList,
  SettingsStackScreenNames.AppSettings
>;
