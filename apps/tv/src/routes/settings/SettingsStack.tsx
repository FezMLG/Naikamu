import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';

import { useTranslate } from '../../i18n/useTranslate';
import { DrawerActions } from '@react-navigation/native';
import SettingsScreen from '../../screens/SettingsScreen';
import { RootStackParamList, ScreenNames, SettingsScreenProps } from '../main';
import ActionConfirmScreen from '../../screens/auth/ActionConfirmScreen';
import { LogBox } from 'react-native';

const defaultOptions = ({ title }: { title?: string }) => {
  return {
    title: title,
  };
};

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Stack = createNativeStackNavigator<RootStackParamList>();

const SettingsStack = () => {
  const { translate } = useTranslate();

  return (
    <Stack.Navigator initialRouteName={ScreenNames.Settings}>
      <Stack.Screen
        name={ScreenNames.Settings}
        component={SettingsScreen}
        options={({ navigation }: SettingsScreenProps) => ({
          ...defaultOptions({
            title: translate('routes.' + ScreenNames.Settings),
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
        name={ScreenNames.ActionConfirm}
        component={ActionConfirmScreen}
        options={{
          ...defaultOptions({
            title: translate('routes.' + ScreenNames.ActionConfirm),
          }),
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
