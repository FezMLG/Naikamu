import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { defaultRadius } from '../../styles';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslate } from '../../i18n/useTranslate';
import { StyleSheet, Text } from 'react-native';

import { defaultHeaderOptions } from './defaultHeaderOptions';
import { RootStackParamList, RootStackScreenNames } from './root.interfaces';
import { SettingsStack } from './settings';
import { BrowseStack } from './browse';
import { MyListStack } from './mylist';
import { SearchStack } from './search';

const BottomTab = createBottomTabNavigator<RootStackParamList>();

const BottomTabContent = (props: {
  focused: boolean;
  color: string;
  size: number;
  route: RouteProp<RootStackParamList, keyof RootStackParamList>;
}) => {
  let iconName = '';

  switch (props.route.name) {
    case RootStackScreenNames.BrowseStack:
      iconName = props.focused ? 'compass' : 'compass-outline';
      break;
    case RootStackScreenNames.SettingsStack:
      iconName = props.focused ? 'cog' : 'cog-outline';
      break;
    case RootStackScreenNames.SearchStack:
      iconName = props.focused ? 'movie-search' : 'movie-search-outline';
      break;
    case RootStackScreenNames.MyListStack:
      iconName = props.focused
        ? 'bookmark-box-multiple'
        : 'bookmark-box-multiple-outline';
      break;
  }

  return <Icon name={iconName} size={props.size} color={props.color} />;
};

export const RootStack = () => {
  const { translate } = useTranslate();

  return (
    <BottomTab.Navigator
      initialRouteName={RootStackScreenNames.BrowseStack}
      screenOptions={({ route }) => ({
        headerShown: false,
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
          name={RootStackScreenNames.BrowseStack}
          component={BrowseStack}
          options={() => ({
            ...defaultHeaderOptions({
              title: translate('routes.' + RootStackScreenNames.BrowseStack),
            }),
            animation: 'slide_from_right',
          })}
        />
        <BottomTab.Screen
          name={RootStackScreenNames.SearchStack}
          component={SearchStack}
          options={{
            ...defaultHeaderOptions({
              title: translate('routes.' + RootStackScreenNames.SearchStack),
            }),
          }}
        />
        <BottomTab.Screen
          name={RootStackScreenNames.MyListStack}
          component={MyListStack}
          options={{
            ...defaultHeaderOptions({
              title: translate('routes.' + RootStackScreenNames.MyListStack),
            }),
          }}
        />
        <BottomTab.Screen
          name={RootStackScreenNames.SettingsStack}
          component={SettingsStack}
          options={{
            ...defaultHeaderOptions({
              title: translate('routes.' + RootStackScreenNames.SettingsStack),
            }),
          }}
        />
      </BottomTab.Group>
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
