import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum OfflineWatchScreenNames {
  Offline = 'Offline',
  OfflineEpisodes = 'OfflineEpisodes',
  WatchNative = 'WatchNative',
}

export type OfflineWatchParamList = {
  [OfflineWatchScreenNames.Offline]: undefined;
  [OfflineWatchScreenNames.OfflineEpisodes]: {
    animeId: string;
    animeName: string;
    episodes: {
      number: number;
      title: string;
      length: number;
      translator: string;
      fileName: string;
    }[];
  };
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
