import { NativeNativeBottomTabScreenProps } from '@bottom-tabs/react-navigation';
import { NavigatorScreenParams } from '@react-navigation/native';

import { BrowseStackParameterList as BrowseStackParameterList } from './browse';
import { HomeStackParameterList } from './home';
import { MyListStackParameterList as MyListStackParameterList } from './mylist';
import { SearchStackParameterList as SearchStackParameterList } from './search';
import { SettingsStackParameterList as SettingsStackParameterList } from './settings';

export enum BottomTabStackScreenNames {
  SettingsStack = 'SettingsStack',
  BrowseStack = 'BrowseStack',
  SearchStack = 'SearchStack',
  MyListStack = 'MyListStack',
  HomeStack = 'HomeStack',
}

export type BottomTabStackParameterList = {
  [BottomTabStackScreenNames.SettingsStack]: NavigatorScreenParams<SettingsStackParameterList>;
  [BottomTabStackScreenNames.BrowseStack]: NavigatorScreenParams<BrowseStackParameterList>;
  [BottomTabStackScreenNames.SearchStack]: NavigatorScreenParams<SearchStackParameterList>;
  [BottomTabStackScreenNames.MyListStack]: NavigatorScreenParams<MyListStackParameterList>;
  [BottomTabStackScreenNames.HomeStack]: NavigatorScreenParams<HomeStackParameterList>;
};

export type BottomTabStackBrowseStackScreenProps = NativeBottomTabScreenProps<
  BottomTabStackParameterList,
  BottomTabStackScreenNames.BrowseStack
>;
export type BottomTabStackSettingsStackScreenProps = NativeBottomTabScreenProps<
  BottomTabStackParameterList,
  BottomTabStackScreenNames.SettingsStack
>;
export type BottomTabStackMyListStackScreenProps = NativeBottomTabScreenProps<
  BottomTabStackParameterList,
  BottomTabStackScreenNames.MyListStack
>;
