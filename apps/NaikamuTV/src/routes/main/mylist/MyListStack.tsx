import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTranslate } from '../../../i18n/useTranslate';
import { WatchListScreen } from '../../../screens';

import { MyListStackParameterList, MyListStackScreenNames } from './interface';

const Stack = createNativeStackNavigator<MyListStackParameterList>();

export function MyListStack() {
  const { translate } = useTranslate();

  return (
    <Stack.Navigator
      initialRouteName={MyListStackScreenNames.OfflineStack}
      screenOptions={{}}>
      <Stack.Screen
        component={WatchListScreen}
        name={MyListStackScreenNames.WatchList}
        options={{
          title: translate('routes.' + MyListStackScreenNames.WatchList),
        }}
      />
    </Stack.Navigator>
  );
}
