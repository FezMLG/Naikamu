import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  SettingsStackScreenNames,
  SettingsStackParamList,
} from './settings.interfaces';
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

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export const SettingsStack = () => {
  const { translate } = useTranslate();

  return (
    <Stack.Navigator initialRouteName={SettingsStackScreenNames.Settings}>
      <Stack.Screen
        name={SettingsStackScreenNames.Settings}
        component={SettingsScreen}
        options={() => ({
          ...defaultHeaderOptions({
            title: translate('settings.' + SettingsStackScreenNames.Settings),
          }),
          animation: 'slide_from_right',
        })}
      />
      <Stack.Screen
        name={SettingsStackScreenNames.UserSettings}
        component={UserSettingsScreen}
        options={() => ({
          ...defaultSubHeaderOptions({
            title: translate('settings.' + SettingsStackScreenNames.Settings),
          }),
          animation: 'slide_from_right',
        })}
      />
      <Stack.Screen
        name={SettingsStackScreenNames.AppSettings}
        component={AppSettingsScreen}
        options={() => ({
          ...defaultSubHeaderOptions({
            title: translate('settings.' + SettingsStackScreenNames.Settings),
          }),
          animation: 'slide_from_right',
        })}
      />
      <Stack.Screen
        name={SettingsStackScreenNames.SettingsActionConfirm}
        component={SettingsActionConfirmScreen}
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
        name={SettingsStackScreenNames.SettingsAction}
        component={SettingsActionScreen}
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
};
