import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SeriesStackParameterList as SeriesStackParameterList } from './series';

export enum RootStackScreenNames {
  Main = 'Main',
  SeriesStack = 'SeriesStack',
  NativePlayer = 'NativePlayer',
  WebViewPlayer = 'WebViewPlayer',
}

export type RootStackParameterList = {
  [RootStackScreenNames.Main]: undefined;
  [RootStackScreenNames.SeriesStack]: NavigatorScreenParams<SeriesStackParameterList>;
  [RootStackScreenNames.NativePlayer]: {
    uri: string;
    seriesId: string;
    episodeTitle: string;
    episodeNumber: number;
    referer: string;
    isLocal: boolean;
  };
  [RootStackScreenNames.WebViewPlayer]: {
    uri: string;
  };
};

export type RootStackSeriesStackScreenProps = NativeStackScreenProps<
  RootStackParameterList,
  RootStackScreenNames.SeriesStack
>;
export type RootStackNativePlayerScreenProps = NativeStackScreenProps<
  RootStackParameterList,
  RootStackScreenNames.NativePlayer
>;
export type RootStackWebViewPlayerScreenProps = NativeStackScreenProps<
  RootStackParameterList,
  RootStackScreenNames.WebViewPlayer
>;
