import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum BrowseStackScreenNames {
  Browse = 'Browse',
}

export type BrowseStackParameterList = {
  [BrowseStackScreenNames.Browse]: undefined;
};

export type BrowseStackBrowseScreenProps = NativeStackScreenProps<
  BrowseStackParameterList,
  BrowseStackScreenNames.Browse
>;
