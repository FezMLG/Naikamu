import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MyListParamList, MyListScreenNames } from './interface';
import { colors } from '../../../styles';
import OfflineStack from './offline/OfflineStack';

const Tab = createMaterialTopTabNavigator<MyListParamList>();

export const MyListStack = () => {
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
      />
    </Tab.Navigator>
  );
};
