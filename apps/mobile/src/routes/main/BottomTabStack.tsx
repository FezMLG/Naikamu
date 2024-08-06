import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTranslate } from '../../i18n/useTranslate';
import { defaultRadius } from '../../styles';

import {
  BottomTabStackParameterList as BottomTabStackParameterList,
  BottomTabStackScreenNames,
} from './bottom-tab.interfaces';
import { BrowseStack } from './browse';
import { defaultHeaderOptions } from './defaultHeaderOptions';
import { HomeStack } from './home';
import { MyListStack } from './mylist';
import { SearchStack } from './search';
import { SettingsStack } from './settings';

const BottomTab = createBottomTabNavigator<BottomTabStackParameterList>();

function BottomTabContent(props: {
  focused: boolean;
  color: string;
  size: number;
  route: RouteProp<
    BottomTabStackParameterList,
    keyof BottomTabStackParameterList
  >;
}) {
  let iconName = '';

  switch (props.route.name) {
    case BottomTabStackScreenNames.BrowseStack: {
      iconName = props.focused ? 'compass' : 'compass-outline';
      break;
    }
    case BottomTabStackScreenNames.SettingsStack: {
      iconName = props.focused ? 'cog' : 'cog-outline';
      break;
    }
    case BottomTabStackScreenNames.SearchStack: {
      iconName = props.focused ? 'movie-search' : 'movie-search-outline';
      break;
    }
    case BottomTabStackScreenNames.MyListStack: {
      iconName = props.focused
        ? 'bookmark-box-multiple'
        : 'bookmark-box-multiple-outline';
      break;
    }
  }

  return <Icon color={props.color} name={iconName} size={props.size} />;
}

export function BottomTabStack() {
  const { translate } = useTranslate();

  return (
    <BottomTab.Navigator
      initialRouteName={BottomTabStackScreenNames.BrowseStack}
      screenOptions={({ route }) => ({
        headerShown: false,
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ focused, color }) => (
          <BottomTabContent
            color={color}
            focused={focused}
            route={route}
            size={24}
          />
        ),
        tabBarHideOnKeyboard: true,
        tabBarActiveBackgroundColor: '#FF6932',
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarLabel: ({ focused, color, children }) => (
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
        ),
        tabBarStyle: {
          backgroundColor: '#3A3A3C',
          minHeight: 66,
        },
        tabBarItemStyle: {
          marginVertical: 8,
          marginHorizontal: 8,
          borderRadius: defaultRadius,
          paddingVertical: 5,
          height: 50,
        },
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: 'white',
      })}>
      <BottomTab.Group>
        <BottomTab.Screen
          component={HomeStack}
          name={BottomTabStackScreenNames.HomeStack}
          options={() => ({
            ...defaultHeaderOptions({
              title: translate('routes.' + BottomTabStackScreenNames.HomeStack),
            }),
            animation: 'slide_from_right',
          })}
        />
        <BottomTab.Screen
          component={BrowseStack}
          name={BottomTabStackScreenNames.BrowseStack}
          options={() => ({
            ...defaultHeaderOptions({
              title: translate(
                'routes.' + BottomTabStackScreenNames.BrowseStack,
              ),
            }),
            animation: 'slide_from_right',
          })}
        />
        <BottomTab.Screen
          component={SearchStack}
          name={BottomTabStackScreenNames.SearchStack}
          options={{
            ...defaultHeaderOptions({
              title: translate(
                'routes.' + BottomTabStackScreenNames.SearchStack,
              ),
            }),
          }}
        />
        <BottomTab.Screen
          component={MyListStack}
          name={BottomTabStackScreenNames.MyListStack}
          options={{
            headerShown: true,
            ...defaultHeaderOptions({
              title: translate(
                'routes.' + BottomTabStackScreenNames.MyListStack,
              ),
            }),
          }}
        />
        <BottomTab.Screen
          component={SettingsStack}
          name={BottomTabStackScreenNames.SettingsStack}
          options={{
            ...defaultHeaderOptions({
              title: translate(
                'routes.' + BottomTabStackScreenNames.SettingsStack,
              ),
            }),
          }}
        />
      </BottomTab.Group>
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  center: { alignSelf: 'center' },
  itemMargin: {
    marginLeft: 10,
  },
  labelText: {
    fontSize: 12,
  },
});
