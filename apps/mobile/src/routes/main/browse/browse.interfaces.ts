import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SeriesStackParamList as SeriesStackParameterList } from '../series';

export enum BrowseStackScreenNames {
  Browse = 'Browse',
}

export type BrowseStackParamList = {
  [BrowseStackScreenNames.Browse]: undefined;
};

export type BrowseStackBrowseScreenProps = NativeStackScreenProps<
  BrowseStackParamList,
  BrowseStackScreenNames.Browse
>;
