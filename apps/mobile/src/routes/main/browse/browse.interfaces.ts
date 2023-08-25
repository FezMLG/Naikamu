import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { SeriesStackParamList } from '../series';

export enum BrowseStackScreenNames {
  Browse = 'Browse',
  SeriesStack = 'SeriesStack',
  NativePlayer = 'NativePlayer',
}

export type BrowseStackParamList = {
  [BrowseStackScreenNames.Browse]: undefined;
  [BrowseStackScreenNames.SeriesStack]: NavigatorScreenParams<SeriesStackParamList>;
  [BrowseStackScreenNames.NativePlayer]: {
    uri: string;
    seriesId: string;
    episodeTitle: string;
    player: string;
    episodeNumber: number;
  };
};

export type BrowseStackBrowseScreenProps = NativeStackScreenProps<
  BrowseStackParamList,
  BrowseStackScreenNames.Browse
>;
export type BrowseStackSeriesStackScreenProps = NativeStackScreenProps<
  BrowseStackParamList,
  BrowseStackScreenNames.SeriesStack
>;
export type BrowseStackNativePlayerScreenProps = NativeStackScreenProps<
  BrowseStackParamList,
  BrowseStackScreenNames.NativePlayer
>;
