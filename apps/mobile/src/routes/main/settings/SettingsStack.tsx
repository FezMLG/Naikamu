import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTranslate } from '../../../i18n/useTranslate';
import {
  AppSettingsScreen,
  SettingsActionConfirmScreen,
  SettingsActionScreen,
  SettingsScreen,
  UserSettingsScreen,
} from '../../../screens';
import { defaultHeaderOptions } from '../defaultHeaderOptions';
import { defaultSubHeaderOptions } from '../defaultSubHeaderOptions';

import {
  SettingsStackScreenNames,
  SettingsStackParamList as SettingsStackParameterList,
} from './settings.interfaces';

const Stack = createNativeStackNavigator<SettingsStackParameterList>();

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
            title: translate('settings.' + SettingsStackScreenNames.Settings),
          }),
          animation: 'slide_from_right',
        })}
      />
      <Stack.Screen
        component={AppSettingsScreen}
        name={SettingsStackScreenNames.AppSettings}
        options={() => ({
          ...defaultSubHeaderOptions({
            title: translate('settings.' + SettingsStackScreenNames.Settings),
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
              'settings.categories.' +
                SettingsStackScreenNames.SettingsActionConfirm,
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
              'settings.categories.' + SettingsStackScreenNames.SettingsAction,
            ),
          }),
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}
