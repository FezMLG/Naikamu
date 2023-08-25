import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';

import { BrowseStackParamList as BrowseStackParameterList } from './browse';
import { MyListStackParamList as MyListStackParameterList } from './mylist';
import { SearchStackParamList as SearchStackParameterList } from './search';
import { SettingsStackParamList as SettingsStackParameterList } from './settings';

export enum BottomTabStackScreenNames {
  SettingsStack = 'SettingsStack',
  BrowseStack = 'BrowseStack',
  SearchStack = 'SearchStack',
  MyListStack = 'MyListStack',
}

export type BottomTabStackParamList = {
  [BottomTabStackScreenNames.SettingsStack]: NavigatorScreenParams<SettingsStackParameterList>;
  [BottomTabStackScreenNames.BrowseStack]: NavigatorScreenParams<BrowseStackParameterList>;
  [BottomTabStackScreenNames.SearchStack]: NavigatorScreenParams<SearchStackParameterList>;
  [BottomTabStackScreenNames.MyListStack]: NavigatorScreenParams<MyListStackParameterList>;
};

export type BottomTabStackBrowseStackScreenProps = BottomTabScreenProps<
  BottomTabStackParamList,
  BottomTabStackScreenNames.BrowseStack
>;
export type BottomTabStackSettingsStackScreenProps = BottomTabScreenProps<
  BottomTabStackParamList,
  BottomTabStackScreenNames.SettingsStack
>;
export type BottomTabStackMyListStackScreenProps = BottomTabScreenProps<
  BottomTabStackParamList,
  BottomTabStackScreenNames.MyListStack
>;
