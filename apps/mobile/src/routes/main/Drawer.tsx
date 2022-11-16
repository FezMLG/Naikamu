import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  BrowseScreenProps,
  RootStackParamList,
  ScreenNames,
  SearchScreenProps,
} from './interfaces';
import BrowseScreen from '../../screens/BrowseScreen';
import SearchScreen from '../../screens/search/SearchScreen';
import { DrawerActions } from '@react-navigation/native';
import { IconButton, Text } from 'react-native-paper';
import { useTranslate } from '../../i18n/useTranslate';
import { RootState } from '../../services/store/store';
import { globalStyle } from '../../styles/global.style';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import SettingsStack from '../settings/SettingsStack';
import { ENV, API_URL } from '@env';

const defaultOptions = ({ title }: { title?: string }) => {
  return {
    title: title,
  };
};

const Drawer = createDrawerNavigator<RootStackParamList>();

const DrawerContent = (props: DrawerContentComponentProps) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { translate } = useTranslate();

  return (
    <DrawerContentScrollView {...props}>
      <View style={[styles.itemMargin, globalStyle.spacer]}>
        <Text variant="bodyMedium">{translate('text.hello')},</Text>
        <Text variant="titleMedium">
          {user?.displayName ? user.displayName : user?.email}
        </Text>
      </View>
      <DrawerItemList {...props} />
      <Text style={{ color: '#f85149' }}>
        {ENV !== 'prod' && <Text>api_url: {API_URL}</Text>}
      </Text>
    </DrawerContentScrollView>
  );
};

export const DrawerNav = () => {
  const { translate } = useTranslate();

  return (
    <Drawer.Navigator
      initialRouteName={ScreenNames.Browse}
      drawerContent={props => {
        return <DrawerContent {...props} />;
      }}>
      <Drawer.Screen
        name={ScreenNames.Browse}
        component={BrowseScreen}
        options={({ navigation }: BrowseScreenProps) => ({
          ...defaultOptions({
            title: translate('routes.' + ScreenNames.Browse),
          }),
          animation: 'slide_from_right',
          headerBackVisible: false,
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
        name={ScreenNames.Search}
        component={SearchScreen}
        options={({ navigation }: SearchScreenProps) => ({
          ...defaultOptions({
            title: translate('routes.' + ScreenNames.Search),
          }),
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
      <Drawer.Screen
        name={ScreenNames.SettingsStack}
        component={SettingsStack}
        options={{
          title: translate('routes.' + ScreenNames.Settings),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  center: { alignSelf: 'center' },
  itemMargin: {
    marginLeft: 15,
  },
});
