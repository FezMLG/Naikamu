import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SeriesStackParameterList as SeriesStackParameterList } from './series';

export enum RootStackScreenNames {
  Main = 'Main',
  SeriesStack = 'SeriesStack',
  NativePlayer = 'NativePlayer',
}

export type RootStackParameterList = {
  [RootStackScreenNames.Main]: undefined;
  [RootStackScreenNames.SeriesStack]: NavigatorScreenParams<SeriesStackParameterList>;
  [RootStackScreenNames.NativePlayer]: {
    uri: string;
    seriesId: string;
    episodeTitle: string;
    episodeNumber: number;
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
