import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTranslate } from '../../../i18n/useTranslate';
import {
  AppSettingsScreen,
  HelpSettingsScreen,
  SettingsActionConfirmScreen,
  SettingsActionScreen,
  SettingsScreen,
  UserSettingsScreen,
} from '../../../screens';
import { ExternalServicesSettingsScreen } from '../../../screens/settings/ExternalServicesSettingsScreen.tsx';
import { defaultHeaderOptions } from '../defaultHeaderOptions';
import { defaultSubHeaderOptions } from '../defaultSubHeaderOptions';

import {
  SettingsStackScreenNames,
  SettingsStackParameterList as SettingsStackParameterList,
} from './settings.interfaces';

const Stack = createNativeStackNavigator<SettingsStackParameterList>();

const translateScreenNameKey = 'settings.categories.';

export function SettingsStack() {
  const { translate } = useTranslate();

  return (
    <Stack.Navigator initialRouteName={SettingsStackScreenNames.Settings}>
      <Stack.Screen
        component={SettingsScreen}
        name={SettingsStackScreenNames.Settings}
        options={() => ({
          ...defaultHeaderOptions({
            title: translate('settings.' + SettingsStackScreenNames.Settings),
          }),
          animation: 'slide_from_right',
        })}
      />
      <Stack.Screen
        component={UserSettingsScreen}
        name={SettingsStackScreenNames.UserSettings}
        options={() => ({
          ...defaultSubHeaderOptions({
            title: translate(
              translateScreenNameKey + SettingsStackScreenNames.UserSettings,
            ),
          }),
          animation: 'slide_from_right',
        })}
      />
      <Stack.Screen
        component={AppSettingsScreen}
        name={SettingsStackScreenNames.AppSettings}
        options={() => ({
          ...defaultSubHeaderOptions({
            title: translate(
              translateScreenNameKey + SettingsStackScreenNames.AppSettings,
            ),
          }),
          animation: 'slide_from_right',
        })}
      />
      <Stack.Screen
        component={ExternalServicesSettingsScreen}
        name={SettingsStackScreenNames.ExternalServicesSettings}
        options={() => ({
          ...defaultSubHeaderOptions({
            title: translate(
              translateScreenNameKey +
                SettingsStackScreenNames.ExternalServicesSettings,
            ),
          }),
          animation: 'slide_from_right',
        })}
      />
      <Stack.Screen
        component={HelpSettingsScreen}
        name={SettingsStackScreenNames.HelpSettings}
        options={() => ({
          ...defaultSubHeaderOptions({
            title: translate(
              translateScreenNameKey + SettingsStackScreenNames.HelpSettings,
            ),
          }),
          animation: 'slide_from_right',
        })}
      />
      <Stack.Screen
        component={SettingsActionConfirmScreen}
        name={SettingsStackScreenNames.SettingsActionConfirm}
        options={{
          ...defaultSubHeaderOptions({
            title: translate(
              'routes.' + SettingsStackScreenNames.SettingsActionConfirm,
            ),
          }),
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        component={SettingsActionScreen}
        name={SettingsStackScreenNames.SettingsAction}
        options={{
          ...defaultSubHeaderOptions({
            title: translate(
              'routes.' + SettingsStackScreenNames.SettingsAction,
            ),
          }),
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}
