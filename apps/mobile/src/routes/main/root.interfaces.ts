import { NavigatorScreenParams } from '@react-navigation/native';
import { SettingsStackParamList } from './settings';
import { MyListStackParamList } from './mylist';
import { BrowseStackParamList } from './browse';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export enum RootStackScreenNames {
  SettingsStack = 'SettingsStack',
  BrowseStack = 'BrowseStack',
  MyListStack = 'MyListStack',
}

export type RootStackParamList = {
  [RootStackScreenNames.SettingsStack]: NavigatorScreenParams<SettingsStackParamList>;
  [RootStackScreenNames.BrowseStack]: NavigatorScreenParams<BrowseStackParamList>;
  [RootStackScreenNames.MyListStack]: NavigatorScreenParams<MyListStackParamList>;
};

export type RootStackBrowseStackScreenProps = BottomTabScreenProps<
  RootStackParamList,
  RootStackScreenNames.BrowseStack
>;
export type RootStackSettingsStackScreenProps = BottomTabScreenProps<
  RootStackParamList,
  RootStackScreenNames.SettingsStack
>;
export type RootStackMyListStackScreenProps = BottomTabScreenProps<
  RootStackParamList,
  RootStackScreenNames.MyListStack
>;
