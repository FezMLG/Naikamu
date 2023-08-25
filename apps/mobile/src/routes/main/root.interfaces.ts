import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SeriesStackParamList as SeriesStackParameterList } from './series';

export enum RootStackScreenNames {
  Main = 'Main',
  SeriesStack = 'SeriesStack',
  NativePlayer = 'NativePlayer',
}

export type RootStackParamList = {
  [RootStackScreenNames.Main]: undefined;
  [RootStackScreenNames.SeriesStack]: NavigatorScreenParams<SeriesStackParameterList>;
  [RootStackScreenNames.NativePlayer]: {
    uri: string;
    seriesId: string;
    episodeTitle: string;
    player: string;
    episodeNumber: number;
  };
};

export type RootStackSeriesStackScreenProps = NativeStackScreenProps<
  RootStackParamList,
  RootStackScreenNames.SeriesStack
>;
export type RootStackNativePlayerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  RootStackScreenNames.NativePlayer
>;
