import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  BrowseStackParamList,
  BrowseStackScreenNames,
} from './browse.interfaces';
import { useTranslate } from '../../../i18n/useTranslate';
import { defaultHeaderOptions } from '../defaultHeaderOptions';
import { BrowseScreen } from '../../../screens';

const StackAuthorized = createNativeStackNavigator<BrowseStackParamList>();

export const BrowseStack = () => {
  const { translate } = useTranslate();

  return (
    <StackAuthorized.Navigator initialRouteName={BrowseStackScreenNames.Browse}>
      <StackAuthorized.Screen
        name={BrowseStackScreenNames.Browse}
        component={BrowseScreen}
        options={() => ({
          ...defaultHeaderOptions({
            title: translate('routes.' + BrowseStackScreenNames.Browse),
          }),
          animation: 'slide_from_right',
        })}
      />
    </StackAuthorized.Navigator>
  );
};
