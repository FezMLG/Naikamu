import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum ScreenNames {
  Browse = 'Browse',
  Search = 'Search',
  HomeDrawer = 'HomeDrawer',
  SearchResults = 'SearchResults',
  Series = 'Series',
  WatchNative = 'WatchNative',
  WatchWebView = 'WatchWebView',
  WatchError = 'WatchError',
  Episodes = 'Episodes',
}

export type RootStackParamList = {
  [ScreenNames.Browse]: undefined;
  [ScreenNames.Search]: undefined;
  [ScreenNames.HomeDrawer]: undefined;
  [ScreenNames.SearchResults]: { phrase?: string };
  [ScreenNames.Series]: { title: string; id: number };
  [ScreenNames.Episodes]: {
    title: string;
    numOfAiredEpisodes: number;
    posterUrl: string;
  };
  [ScreenNames.WatchNative]: {
    uri: string;
    title: string;
    episodeTitle: string;
    player: string;
  };
  [ScreenNames.WatchWebView]: { uri: string };
  [ScreenNames.WatchError]: { playerName: string; animeTitle: string };
};

export type BrowsePageProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.Browse
>;
export type SearchPageProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.Search
>;
export type HomeDrawerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.HomeDrawer
>;
export type SearchResultsPageProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.SearchResults
>;
export type SeriesPageProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.Series
>;
export type EpisodesPageProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.Episodes
>;
export type WatchNativePageProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.WatchNative
>;
export type WatchWebViewPageProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.WatchWebView
>;
export type WatchErrorPageProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.WatchError
>;
