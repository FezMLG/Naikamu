import * as React from 'react';
import {
  BrowseScreenProps,
  RootStackParamList,
  ScreenNames,
  SearchScreenProps,
} from './interfaces';
import BrowseScreen from '../../screens/BrowseScreen';
import SearchScreen from '../../screens/search/SearchScreen';
import { RouteProp } from '@react-navigation/native';
import { useTranslate } from '../../i18n/useTranslate';
import { StyleSheet, Text } from 'react-native';
import SettingsStack from '../settings/SettingsStack';
import { SettingsScreenNames } from '../settings/interfaces';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { maxWidth } from '../../components/maxDimensions';
import { MyListStack } from './mylist/MyListTopTabsNavigation';
import { defaultRadius } from '../../styles';

export const defaultHeaderOptions = ({ title }: { title?: string }) => {
  return {
    title: title,
    headerTitleStyle: {
      fontFamily: 'Catamaran-Black',
      fontSize: 36,
    },
    headerStyle: {
      backgroundColor: 'none',
      height: 80,
    },
    headerLeft: () => <></>,
  };
};

const BottomTab = createBottomTabNavigator<RootStackParamList>();

const BottomTabContent = (props: {
  focused: boolean;
  color: string;
  size: number;
  route: RouteProp<RootStackParamList, keyof RootStackParamList>;
}) => {
  let iconName = '';

  switch (props.route.name) {
    case ScreenNames.Browse:
      iconName = props.focused ? 'compass' : 'compass';
      break;
    case ScreenNames.Search:
      iconName = props.focused ? 'movie-search' : 'movie-search-outline';
      break;
    case ScreenNames.SettingsStack:
      iconName = props.focused ? 'cog' : 'cog-outline';
      break;
    case ScreenNames.MyListStack:
      iconName = props.focused
        ? 'bookmark-box-multiple'
        : 'bookmark-box-multiple-outline';
      break;
  }

  return <Icon name={iconName} size={props.size} color={props.color} />;
};

export const BottomTabNavigation = () => {
  const { translate } = useTranslate();

  return (
    <BottomTab.Navigator
      initialRouteName={ScreenNames.Browse}
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ focused, color }) => {
          return (
            <BottomTabContent
              focused={focused}
              color={color}
              size={24}
              route={route}
            />
          );
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveBackgroundColor: '#FF6932',
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarLabel: ({ focused, color, children }) => {
          return (
            <Text
              style={[
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  fontFamily: focused ? 'Roboto-Bold' : 'Roboto-Regular',
                  color,
                },
                styles.labelText,
              ]}>
              {children}
            </Text>
          );
        },
        tabBarStyle: {
          height: 70,
          position: 'absolute',
          backgroundColor: '#3A3A3C',
        },
        tabBarItemStyle: {
          marginVertical: 8,
          marginHorizontal: 8,
          borderRadius: defaultRadius,
          paddingVertical: 5,
        },
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: 'white',
      })}>
      <BottomTab.Screen
        name={ScreenNames.Browse}
        component={BrowseScreen}
        options={({}: BrowseScreenProps) => ({
          ...defaultHeaderOptions({
            title: translate('routes.' + ScreenNames.Browse),
          }),
          animation: 'slide_from_right',
        })}
      />
      <BottomTab.Screen
        name={ScreenNames.Search}
        component={SearchScreen}
        options={({}: SearchScreenProps) => ({
          ...defaultHeaderOptions({
            title: translate('routes.' + ScreenNames.Search),
          }),
          animation: 'slide_from_right',
        })}
      />
      <BottomTab.Screen
        name={ScreenNames.MyListStack}
        component={MyListStack}
        options={{
          ...defaultHeaderOptions({
            title: translate('routes.' + ScreenNames.MyListStack),
          }),
        }}
      />
      <BottomTab.Screen
        name={ScreenNames.SettingsStack}
        component={SettingsStack}
        options={{
          ...defaultHeaderOptions({
            title: translate('routes.' + SettingsScreenNames.Settings),
          }),
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  center: { alignSelf: 'center' },
  itemMargin: {
    marginLeft: 10,
  },
  labelText: {
    fontSize: 12,
  },
});
