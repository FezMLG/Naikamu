import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { IOfflineSeries } from '../../../../services';

export enum DownloadStackScreenNames {
  List = 'List',
  SeriesEpisodes = 'SeriesEpisodes',
}

export type DownloadStackParameterList = {
  [DownloadStackScreenNames.List]: undefined;
  [DownloadStackScreenNames.SeriesEpisodes]: IOfflineSeries;
};

export type DownloadStackListScreenProps = NativeStackScreenProps<
  DownloadStackParameterList,
  DownloadStackScreenNames.List
>;

export type DownloadStackSeriesEpisodesScreenProps = NativeStackScreenProps<
  DownloadStackParameterList,
  DownloadStackScreenNames.SeriesEpisodes
>;
