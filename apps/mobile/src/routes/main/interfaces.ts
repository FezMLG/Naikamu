import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum ScreenNames {
  SettingsStack = 'SettingsStack',
  Home = 'Home',
  Browse = 'Browse',
  Search = 'Search',
  HomeDrawer = 'HomeDrawer',
  SearchResults = 'SearchResults',
  Series = 'Series',
  WatchNative = 'WatchNative',
  Episodes = 'Episodes',
}

export type RootStackParamList = {
  [ScreenNames.SettingsStack]: undefined;
  [ScreenNames.Browse]: undefined;
  [ScreenNames.Home]: undefined;
  [ScreenNames.Search]: undefined;
  [ScreenNames.HomeDrawer]: undefined;
  [ScreenNames.SearchResults]: { phrase?: string };
  [ScreenNames.Series]: { title: string; id: number };
  [ScreenNames.Episodes]: {
    id: string;
    title: string;
    numOfAiredEpisodes: number;
    posterUrl: string;
    episodeLength: number;
  };
  [ScreenNames.WatchNative]: {
    uri: string;
    title: string;
    episodeTitle: string;
    player: string;
    episodeNumber: number;
  };
};

export type SettingsStackScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.SettingsStack
>;
export type BrowseScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.Browse
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
