import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

import { useTranslate } from '../../i18n/useTranslate';
import { NativeVideoPlayerScreen } from '../../screens';
import { WebViewPlayerScreen } from '../../screens/player/WebViewPlayerScreen';

import { BottomTabStack } from './BottomTabStack';
import { BrowseStackScreenNames } from './browse';
import { defaultHeaderOptions } from './defaultHeaderOptions';
import { defaultSubHeaderOptions } from './defaultSubHeaderOptions';
import {
  RootStackParameterList as RootStackParameterList,
  RootStackScreenNames,
} from './root.interfaces';
import { SeriesStack } from './series';

const StackAuthorized = createNativeStackNavigator<RootStackParameterList>();

export function RootStack() {
  const { translate } = useTranslate();

  return (
    <StackAuthorized.Navigator
      initialRouteName={RootStackScreenNames.Main}
      screenOptions={{
        headerShown: false,
      }}>
      <StackAuthorized.Screen
        component={BottomTabStack}
        name={RootStackScreenNames.Main}
        options={() => ({
          ...defaultHeaderOptions({
            title: translate('routes.' + BrowseStackScreenNames.Browse),
          }),
          animation: 'slide_from_right',
        })}
      />
      <StackAuthorized.Screen
        component={SeriesStack}
        name={RootStackScreenNames.SeriesStack}
        options={() => ({
          ...defaultSubHeaderOptions({}),
          presentation: 'modal',
          animation: 'slide_from_bottom',
        })}
      />
      <StackAuthorized.Screen
        component={NativeVideoPlayerScreen}
        name={RootStackScreenNames.NativePlayer}
        options={{
          ...defaultSubHeaderOptions({}),
          autoHideHomeIndicator: true,
          fullScreenGestureEnabled: true,
          presentation: Platform.OS === 'android' ? 'card' : 'fullScreenModal',
        }}
      />
      <StackAuthorized.Screen
        component={WebViewPlayerScreen}
        name={RootStackScreenNames.WebViewPlayer}
        options={{
          ...defaultSubHeaderOptions({}),
          autoHideHomeIndicator: true,
          fullScreenGestureEnabled: true,
          presentation: Platform.OS === 'android' ? 'card' : 'fullScreenModal',
        }}
      />
    </StackAuthorized.Navigator>
  );
}
