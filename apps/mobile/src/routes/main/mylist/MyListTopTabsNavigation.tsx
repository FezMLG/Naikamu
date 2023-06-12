import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MyListParamList, MyListScreenNames } from './interface';
import OfflineScreen from '../../../screens/mylist/OfflineScreen';

const Tab = createMaterialTopTabNavigator<MyListParamList>();

export const MyListStack = () => {
  return (
    <Tab.Navigator initialRouteName={MyListScreenNames.Offline}>
      <Tab.Screen name={MyListScreenNames.Offline} component={OfflineScreen} />
    </Tab.Navigator>
  );
};
