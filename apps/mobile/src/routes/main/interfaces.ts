import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';

export enum ScreenNames {
  SettingsStack = 'SettingsStack',
  Home = 'Home',
  Browse = 'Browse',
  BrowseStack = 'BrowseStack',
  Search = 'Search',
  HomeDrawer = 'HomeDrawer',
  SearchResults = 'SearchResults',
  SeriesStack = 'SeriesStack',
  Series = 'Series',
  WatchNative = 'WatchNative',
  Episodes = 'Episodes',
  MyListStack = 'MyListStack',
  TabBarStack = 'TabBarStack',
}

export type RootStackParamList = {
  [ScreenNames.SettingsStack]: undefined;
  [ScreenNames.TabBarStack]: undefined;
  [ScreenNames.Browse]: undefined;
  [ScreenNames.BrowseStack]: undefined;
  [ScreenNames.Home]: undefined;
  [ScreenNames.Search]: undefined;
  [ScreenNames.HomeDrawer]: undefined;
  [ScreenNames.SearchResults]: { phrase?: string };
  [ScreenNames.Series]: { title: string; id: number };
  [ScreenNames.SeriesStack]: NavigatorScreenParams<any>;
  [ScreenNames.Episodes]: {
    id: string;
    title: string;
    numOfAiredEpisodes: number;
    posterUrl: string;
    episodeLength: number;
  };
  [ScreenNames.WatchNative]: {
    uri: string;
    seriesId: string;
    episodeTitle: string;
    player: string;
    episodeNumber: number;
  };
  [ScreenNames.MyListStack]: undefined;
};

export type SettingsStackScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.SettingsStack
>;
export type BrowseScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.Browse
>;
export type BrowseStackProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.BrowseStack
>;
export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.Home
>;
export type SearchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.Search
>;
export type HomeDrawerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.HomeDrawer
>;
export type SearchResultsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.SearchResults
>;
export type SeriesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.Series
>;
export type EpisodesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.Episodes
>;
export type WatchNativeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.WatchNative
>;
export type MyListStackProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.MyListStack
>;
