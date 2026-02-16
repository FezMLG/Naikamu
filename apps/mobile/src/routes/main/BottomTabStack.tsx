import React from 'react';

import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation';

import { useTranslate } from '../../i18n/useTranslate';

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

const BottomTab = createNativeBottomTabNavigator<BottomTabStackParameterList>();

// Icon mapping for native tabs using SF Symbols
function getTabIcon(
  routeName: keyof BottomTabStackParameterList,
  focused: boolean,
) {
  const iconMap = {
    HomeStack: { focused: 'house.fill' as const, unfocused: 'house' as const },
    BrowseStack: {
      focused: 'safari.fill' as const,
      unfocused: 'safari' as const,
    },
    SearchStack: {
      focused: 'magnifyingglass.circle.fill' as const,
      unfocused: 'magnifyingglass' as const,
    },
    MyListStack: {
      focused: 'bookmark.fill' as const,
      unfocused: 'bookmark' as const,
    },
    SettingsStack: {
      focused: 'gearshape.fill' as const,
      unfocused: 'gearshape' as const,
    },
  };

  const icons = iconMap[routeName];

  return focused ? icons.focused : icons.unfocused;
}

export function BottomTabStack() {
  const { translate } = useTranslate();

  return (
    <BottomTab.Navigator
      initialRouteName={BottomTabStackScreenNames.HomeStack}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#FF6932',
        // Native icon configuration using SF Symbols
        tabBarIcon: ({ focused }) => ({
          sfSymbol: getTabIcon(route.name, focused),
        }),
      })}>
      <BottomTab.Group>
        <BottomTab.Screen
          component={HomeStack}
          name={BottomTabStackScreenNames.HomeStack}
          options={() => ({
            ...defaultHeaderOptions({
              title: translate('routes.' + BottomTabStackScreenNames.HomeStack),
            }),
            animation: 'shift',
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
            animation: 'shift',
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
