import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum RoutesNames {
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
  [RoutesNames.Browse]: undefined;
  [RoutesNames.Search]: undefined;
  [RoutesNames.HomeDrawer]: undefined;
  [RoutesNames.SearchResults]: { phrase?: string };
  [RoutesNames.Series]: { title: string; id: number };
  [RoutesNames.Episodes]: {
    title: string;
    numOfAiredEpisodes: number;
    posterUrl: string;
  };
  [RoutesNames.WatchNative]: {
    uri: string;
    title: string;
    episodeTitle: string;
    player: string;
  };
  [RoutesNames.WatchWebView]: { uri: string };
  [RoutesNames.WatchError]: { playerName: string; animeTitle: string };
};

export type BrowsePageProps = NativeStackScreenProps<
  RootStackParamList,
  RoutesNames.Browse
>;
export type SearchPageProps = NativeStackScreenProps<
  RootStackParamList,
  RoutesNames.Search
>;
export type HomeDrawerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  RoutesNames.HomeDrawer
>;
export type SearchResultsPageProps = NativeStackScreenProps<
  RootStackParamList,
  RoutesNames.SearchResults
>;
export type SeriesPageProps = NativeStackScreenProps<
  RootStackParamList,
  RoutesNames.Series
>;
export type EpisodesPageProps = NativeStackScreenProps<
  RootStackParamList,
  RoutesNames.Episodes
>;
export type WatchNativePageProps = NativeStackScreenProps<
  RootStackParamList,
  RoutesNames.WatchNative
>;
export type WatchWebViewPageProps = NativeStackScreenProps<
  RootStackParamList,
  RoutesNames.WatchWebView
>;
export type WatchErrorPageProps = NativeStackScreenProps<
  RootStackParamList,
  RoutesNames.WatchError
>;
