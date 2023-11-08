import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
          animation: 'slide_from_right',
        })}
      />
      <Stack.Screen
        component={SeriesStack}
        name={RootStackScreenNames.SeriesStack}
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
