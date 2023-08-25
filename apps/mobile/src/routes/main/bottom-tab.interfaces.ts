import { NavigatorScreenParams } from '@react-navigation/native';
import { SettingsStackParamList } from './settings';
import { MyListStackParamList } from './mylist';
import { BrowseStackParamList } from './browse';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { SearchStackParamList } from './search';

export enum BottomTabStackScreenNames {
  SettingsStack = 'SettingsStack',
  BrowseStack = 'BrowseStack',
  SearchStack = 'SearchStack',
  MyListStack = 'MyListStack',
}

export type BottomTabStackParamList = {
  [BottomTabStackScreenNames.SettingsStack]: NavigatorScreenParams<SettingsStackParamList>;
  [BottomTabStackScreenNames.BrowseStack]: NavigatorScreenParams<BrowseStackParamList>;
  [BottomTabStackScreenNames.SearchStack]: NavigatorScreenParams<SearchStackParamList>;
  [BottomTabStackScreenNames.MyListStack]: NavigatorScreenParams<MyListStackParamList>;
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
