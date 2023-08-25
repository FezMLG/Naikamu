import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IOfflineSeries } from '../../../../services';

export enum DownloadStackScreenNames {
  List = 'List',
  SeriesEpisodes = 'SeriesEpisodes',
  WatchNative = 'WatchNative',
}

export type DownloadStackParamList = {
  [DownloadStackScreenNames.List]: undefined;
  [DownloadStackScreenNames.SeriesEpisodes]: IOfflineSeries;
  [DownloadStackScreenNames.WatchNative]: undefined;
};

export type DownloadStackListScreenProps = NativeStackScreenProps<
  DownloadStackParamList,
  DownloadStackScreenNames.List
>;

export type DownloadStackSeriesEpisodesScreenProps = NativeStackScreenProps<
  DownloadStackParamList,
  DownloadStackScreenNames.SeriesEpisodes
>;

export type DownloadStackWatchNativeScreenProps = NativeStackScreenProps<
  DownloadStackParamList,
  DownloadStackScreenNames.WatchNative
>;
