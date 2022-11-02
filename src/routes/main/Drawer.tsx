import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackParamList, RoutesNames } from './interfaces';
import BrowseScreen from '../../screens/BrowseScreen';

const Drawer = createDrawerNavigator<RootStackParamList>();

export const DrawerNav = () => {
  return (
    <Drawer.Navigator initialRouteName={RoutesNames.Browse}>
      <Drawer.Screen name={RoutesNames.Browse} component={BrowseScreen} />
    </Drawer.Navigator>
  );
};
