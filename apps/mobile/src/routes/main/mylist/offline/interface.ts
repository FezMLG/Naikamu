import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IOfflineSeries } from '../../../../services';

export enum OfflineWatchScreenNames {
  Offline = 'Offline',
  OfflineEpisodes = 'OfflineEpisodes',
  WatchNative = 'WatchNative',
}

export type OfflineWatchParamList = {
  [OfflineWatchScreenNames.Offline]: undefined;
  [OfflineWatchScreenNames.OfflineEpisodes]: IOfflineSeries;
  [OfflineWatchScreenNames.WatchNative]: undefined;
};

export type OfflineWatchScreenProps = NativeStackScreenProps<
  OfflineWatchParamList,
  OfflineWatchScreenNames.Offline
>;

export type OfflineWatchSeriesEpisodesScreenProps = NativeStackScreenProps<
  OfflineWatchParamList,
  OfflineWatchScreenNames.OfflineEpisodes
>;

export type OfflineWatchNativeScreenProps = NativeStackScreenProps<
  OfflineWatchParamList,
  OfflineWatchScreenNames.WatchNative
>;
