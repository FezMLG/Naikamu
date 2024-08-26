import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
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

export type BottomTabStackBrowseStackScreenProps = BottomTabScreenProps<
  BottomTabStackParameterList,
  BottomTabStackScreenNames.BrowseStack
>;
export type BottomTabStackSettingsStackScreenProps = BottomTabScreenProps<
  BottomTabStackParameterList,
  BottomTabStackScreenNames.SettingsStack
>;
export type BottomTabStackMyListStackScreenProps = BottomTabScreenProps<
  BottomTabStackParameterList,
  BottomTabStackScreenNames.MyListStack
>;
