import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MyListStackParamList, MyListStackScreenNames } from './interface';
import { colors } from '../../../styles';
import { useTranslate } from '../../../i18n/useTranslate';
import { DownloadStack } from './offline';

const Tab = createMaterialTopTabNavigator<MyListStackParamList>();

export const MyListStack = () => {
  const { translate } = useTranslate();

  return (
    <Tab.Navigator
      initialRouteName={MyListStackScreenNames.OfflineStack}
      screenOptions={{
        tabBarStyle: { backgroundColor: 'transparent' },
        tabBarIndicatorStyle: { backgroundColor: colors.accent.color },
      }}>
      <Tab.Screen
        name={MyListStackScreenNames.OfflineStack}
        component={DownloadStack}
        options={{
          title: translate('routes.' + MyListStackScreenNames.OfflineStack),
        }}
      />
    </Tab.Navigator>
  );
};
