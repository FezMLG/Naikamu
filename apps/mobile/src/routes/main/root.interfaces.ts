import { NavigatorScreenParams } from '@react-navigation/native';
import { SeriesStackParamList } from './series';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum RootStackScreenNames {
  Main = 'Main',
  SeriesStack = 'SeriesStack',
  NativePlayer = 'NativePlayer',
}

export type RootStackParamList = {
  [RootStackScreenNames.Main]: undefined;
  [RootStackScreenNames.SeriesStack]: NavigatorScreenParams<SeriesStackParamList>;
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
