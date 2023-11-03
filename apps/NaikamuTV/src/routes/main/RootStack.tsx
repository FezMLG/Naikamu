import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTranslate } from '../../i18n/useTranslate';

import { MyListStack } from './mylist';
import {
  RootStackParameterList,
  RootStackScreenNames,
} from './root.interfaces';

const Stack = createNativeStackNavigator<RootStackParameterList>();

export function RootStack() {
  const { translate } = useTranslate();

  return (
    <Stack.Navigator
      initialRouteName={RootStackScreenNames.Main}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        component={MyListStack}
        name={RootStackScreenNames.Main}
        options={() => ({
          animation: 'slide_from_right',
        })}
      />
      {/*<Stack.Screen*/}
      {/*  component={NativeVideoPlayerScreen}*/}
      {/*  name={RootStackScreenNames.NativePlayer}*/}
      {/*  options={{*/}
      {/*    ...defaultSubHeaderOptions({}),*/}
      {/*    autoHideHomeIndicator: true,*/}
      {/*    presentation: 'fullScreenModal',*/}
      {/*  }}*/}
      {/*/>*/}
    </Stack.Navigator>
  );
}
