import React, { useEffect, useState } from 'react';

import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation';
import { Platform, ImageSourcePropType } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

// Icon mapping for SF Symbols (iOS)
function getSFSymbol(
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

// Icon mapping for MaterialCommunityIcons (Android)
function getMaterialIconName(routeName: keyof BottomTabStackParameterList) {
  const iconMap = {
    HomeStack: 'home',
    BrowseStack: 'compass',
    SearchStack: 'magnify',
    MyListStack: 'bookmark',
    SettingsStack: 'cog',
  };

  return iconMap[routeName];
}

// Preloaded Android icons
let androidIcons: Record<string, ImageSourcePropType> | null = null;

async function loadAndroidIcons() {
  const [home, compass, magnify, bookmark, cog] = await Promise.all([
    Icon.getImageSource('home', 24, '#FFFFFF'),
    Icon.getImageSource('compass', 24, '#FFFFFF'),
    Icon.getImageSource('magnify', 24, '#FFFFFF'),
    Icon.getImageSource('bookmark', 24, '#FFFFFF'),
    Icon.getImageSource('cog', 24, '#FFFFFF'),
  ]);

  androidIcons = {
    home,
    compass,
    magnify,
    bookmark,
    cog,
  };
}

// Preload icons on Android
if (Platform.OS === 'android') {
  loadAndroidIcons();
}

export function BottomTabStack() {
  const { translate } = useTranslate();
  const [iconsLoaded, setIconsLoaded] = useState(Platform.OS === 'ios');

  useEffect(() => {
    if (Platform.OS === 'android') {
      // Ensure icons are loaded
      if (androidIcons) {
        setIconsLoaded(true);
      } else {
        loadAndroidIcons().then(() => setIconsLoaded(true));
      }
    }
  }, []);

  // Don't render tabs until Android icons are loaded
  if (!iconsLoaded) {
    return null;
  }

  return (
    <BottomTab.Navigator
      initialRouteName={BottomTabStackScreenNames.HomeStack}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#FF6932',
        tabBarInactiveTintColor: '#F2F2F2',
        tabBarStyle: {
          backgroundColor: '#2C2C2E',
        },
        // Platform-specific icon configuration
        tabBarIcon: ({ focused }) => {
          if (Platform.OS === 'ios') {
            // Use SF Symbols on iOS
            return {
              sfSymbol: getSFSymbol(route.name, focused),
            };
          } else {
            // Use MaterialCommunityIcons on Android
            const iconName = getMaterialIconName(route.name);

            return androidIcons?.[iconName] || { uri: '' };
          }
        },
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
