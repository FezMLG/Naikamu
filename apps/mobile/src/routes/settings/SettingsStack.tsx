import React from 'react';
import { IconButton } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerActions } from '@react-navigation/native';

import { useTranslate } from '../../i18n/useTranslate';
import SettingsScreen from '../../screens/settings/SettingsScreen';
import SettingsActionConfirmScreen from '../../screens/settings/ActionConfirmScreen';
import {
  SettingsScreenNames,
  SettingsScreenProps,
  SettingsStackParamList,
} from './interfaces';
import UserSettingsScreen from '../../screens/settings/UserSettingsScreen';
import DangerSettingsScreen from '../../screens/settings/DangerSettingsScreen';

const defaultOptions = ({ title }: { title?: string }) => {
  return {
    title: title,
  };
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsStack = () => {
  const { translate } = useTranslate();

  return (
    <Stack.Navigator initialRouteName={SettingsScreenNames.Settings}>
      <Stack.Screen
        name={SettingsScreenNames.Settings}
        component={SettingsScreen}
        options={({ navigation }: SettingsScreenProps) => ({
          ...defaultOptions({
            title: translate(
              'settings.categories.' + SettingsScreenNames.Settings,
            ),
          }),
          animation: 'slide_from_right',
          headerLeft: () => (
            <IconButton
              icon="menu"
              size={24}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
        })}
      />
      <Stack.Screen
        name={SettingsScreenNames.UserSettings}
        component={UserSettingsScreen}
        options={() => ({
          ...defaultOptions({
            title: translate(
              'settings.categories.' + SettingsScreenNames.Settings,
            ),
          }),
          animation: 'slide_from_right',
        })}
      />
      <Stack.Screen
        name={SettingsScreenNames.DangerSettings}
        component={DangerSettingsScreen}
        options={() => ({
          ...defaultOptions({
            title: translate(
              'settings.categories.' + SettingsScreenNames.Settings,
            ),
          }),
          animation: 'slide_from_right',
        })}
      />
      <Stack.Screen
        name={SettingsScreenNames.SettingsActionConfirm}
        component={SettingsActionConfirmScreen}
        options={{
          ...defaultOptions({
            title: translate(
              'settings.categories.' +
                SettingsScreenNames.SettingsActionConfirm,
            ),
          }),
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
