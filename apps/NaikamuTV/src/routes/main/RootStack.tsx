import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NativeVideoPlayerScreen } from '../../screens';

import { MyListStack } from './mylist';
import {
  RootStackParameterList,
  RootStackScreenNames,
} from './root.interfaces';
import { SeriesStack } from './series';

const Stack = createNativeStackNavigator<RootStackParameterList>();

export function RootStack() {
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
          animation: 'fade_from_bottom',
        })}
      />
      <Stack.Screen
        component={SeriesStack}
        name={RootStackScreenNames.SeriesStack}
        options={() => ({
          animation: 'fade_from_bottom',
        })}
      />
      <Stack.Screen
        component={NativeVideoPlayerScreen}
        name={RootStackScreenNames.NativePlayer}
        options={{
          autoHideHomeIndicator: true,
          presentation: 'fullScreenModal',
        }}
      />
    </Stack.Navigator>
  );
}
