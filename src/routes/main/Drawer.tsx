import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  BrowsePageProps,
  RootStackParamList,
  RoutesNames,
  SearchPageProps,
} from './interfaces';
import BrowseScreen from '../../screens/BrowseScreen';
import SearchScreen from '../../screens/search/SearchScreen';
import { DrawerActions } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { useTranslate } from '../../i18n/useTranslate';

const defaultOptions = ({ title }: { title?: string }) => {
  return {
    title: title,
  };
};

const Drawer = createDrawerNavigator<RootStackParamList>();

export const DrawerNav = () => {
  const { translate } = useTranslate();

  return (
    <Drawer.Navigator initialRouteName={RoutesNames.Browse}>
      <Drawer.Screen
        name={RoutesNames.Browse}
        component={BrowseScreen}
        options={({ navigation }: BrowsePageProps) => ({
          ...defaultOptions({
            title: translate('routes.' + RoutesNames.Browse),
          }),
          animation: 'slide_from_right',
          headerBackVisible: false,
          // Add a placeholder button without the `onPress` to avoid flicker
          // headerRight: () => (
          //   <IconButton
          //     icon="magnify"
          //     size={24}
          //     onPress={() => navigation.navigate(RoutesNames.Search)}
          //   />
          // ),
          headerLeft: () => (
            <IconButton
              icon="menu"
              size={24}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
        })}
      />
      <Drawer.Screen
        name={RoutesNames.Search}
        component={SearchScreen}
        options={({ navigation }: SearchPageProps) => ({
          ...defaultOptions({ title: RoutesNames.Search }),
          animation: 'slide_from_right',
          headerLeft: () => (
            <IconButton
              icon="menu"
              size={24}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};
