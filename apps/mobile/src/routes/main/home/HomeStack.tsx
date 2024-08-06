import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTranslate } from '../../../i18n/useTranslate';
import { HomeScreen } from '../../../screens';
import { defaultHeaderOptions } from '../defaultHeaderOptions';

import {
  HomeStackParameterList,
  HomeStackScreenNames,
} from './home.interfaces';

const StackAuthorized = createNativeStackNavigator<HomeStackParameterList>();

export function HomeStack() {
  const { translate } = useTranslate();

  return (
    <StackAuthorized.Navigator initialRouteName={HomeStackScreenNames.Home}>
      <StackAuthorized.Screen
        component={HomeScreen}
        name={HomeStackScreenNames.Home}
        options={() => ({
          ...defaultHeaderOptions({
            title: translate('routes.' + HomeStackScreenNames.Home),
          }),
          animation: 'slide_from_right',
        })}
      />
    </StackAuthorized.Navigator>
  );
}
