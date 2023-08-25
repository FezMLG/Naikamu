import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { SeriesStackParamList } from '../series';

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
