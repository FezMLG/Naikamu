import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BrowsePage from '../pages/BrowsePage';
import HomePage from '../pages/HomePage';
import EpisodesListPage from '../pages/series/episodes/EpisodesListPage';
import ErrorPlayerPage from '../pages/series/episodes/player/ErrorPlayerPage';
import NativeVideoPlayerPage from '../pages/series/episodes/player/VideoPlayerPage';
import WebViewPlayerPage from '../pages/series/episodes/player/WebViewPlayerPage';
import SeriesPage from '../pages/series/SeriesPage';

export enum RoutesNames {
  Home = 'Home',
  Browse = 'Browse',
  Series = 'Series',
  WatchNative = 'WatchNative',
  WatchWebView = 'WatchWebView',
  WatchError = 'WatchError',
  Episodes = 'Episodes',
}

export const ScreenRoutes = {
  home: {
    name: RoutesNames.Home,
    component: HomePage,
  },
  browse: {
    name: RoutesNames.Browse,
    component: BrowsePage,
  },
  series: {
    name: RoutesNames.Series,
    component: SeriesPage,
  },
  episodes: {
    name: RoutesNames.Episodes,
    component: EpisodesListPage,
  },
  watchNative: {
    name: RoutesNames.WatchNative,
    component: NativeVideoPlayerPage,
  },
  watchWebView: {
    name: RoutesNames.WatchWebView,
    component: WebViewPlayerPage,
  },
  watchError: {
    name: RoutesNames.WatchError,
    component: ErrorPlayerPage,
  },
};

export type RootStackParamList = {
  [RoutesNames.Home]: undefined;
  [RoutesNames.Browse]: undefined;
  [RoutesNames.Series]: { title: string };
  [RoutesNames.Episodes]: { title: string };
  [RoutesNames.WatchNative]: { uri: string; title: string };
  [RoutesNames.WatchWebView]: { uri: string; title: string };
  [RoutesNames.WatchError]: { uri: string; title: string };
};

export type HomePageProps = NativeStackScreenProps<
  RootStackParamList,
  RoutesNames.Home
>;

export type BrowsePageProps = NativeStackScreenProps<
  RootStackParamList,
  RoutesNames.Browse
>;
export type SeriesPageProps = NativeStackScreenProps<
  RootStackParamList,
  RoutesNames.Series
>;
export type EpisodesPageProps = NativeStackScreenProps<
  RootStackParamList,
  RoutesNames.Series
>;
export type WatchNativePageProps = NativeStackScreenProps<
  RootStackParamList,
  RoutesNames.Series
>;
export type WatchWebViewPageProps = NativeStackScreenProps<
  RootStackParamList,
  RoutesNames.Series
>;
export type WatchErrorPageProps = NativeStackScreenProps<
  RootStackParamList,
  RoutesNames.Series
>;
