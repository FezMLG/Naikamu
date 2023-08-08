import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MyListParamList, MyListScreenNames } from './interface';
import { colors } from '../../../styles';
import OfflineStack from './offline/OfflineStack';
import { useTranslate } from '../../../i18n/useTranslate';
import { defaultHeaderOptions } from '../BottomTabNavigation';

const Tab = createMaterialTopTabNavigator<MyListParamList>();

export const MyListStack = () => {
  const { translate } = useTranslate();

  return (
    <Tab.Navigator
      initialRouteName={MyListScreenNames.OfflineStack}
      screenOptions={{
        tabBarStyle: { backgroundColor: 'transparent' },
        tabBarIndicatorStyle: { backgroundColor: colors.accent.color },
      }}>
      <Tab.Screen
        name={MyListScreenNames.OfflineStack}
        component={OfflineStack}
        options={{
          title: translate('routes.' + MyListScreenNames.OfflineStack),
        }}
      />
    </Tab.Navigator>
  );
};
