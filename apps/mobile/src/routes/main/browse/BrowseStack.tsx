import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTranslate } from '../../../i18n/useTranslate';
import { BrowseScreen } from '../../../screens';
import { defaultHeaderOptions } from '../defaultHeaderOptions';

import {
  BrowseStackParamList as BrowseStackParameterList,
  BrowseStackScreenNames,
} from './browse.interfaces';

const StackAuthorized = createNativeStackNavigator<BrowseStackParameterList>();

export function BrowseStack() {
  const { translate } = useTranslate();

  return (
    <StackAuthorized.Navigator initialRouteName={BrowseStackScreenNames.Browse}>
      <StackAuthorized.Screen
        component={BrowseScreen}
        name={BrowseStackScreenNames.Browse}
        options={() => ({
          ...defaultHeaderOptions({
            title: translate('routes.' + BrowseStackScreenNames.Browse),
          }),
          animation: 'slide_from_right',
        })}
      />
    </StackAuthorized.Navigator>
  );
}
