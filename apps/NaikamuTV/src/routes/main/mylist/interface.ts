import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum MyListStackScreenNames {
  OfflineStack = 'OfflineStack',
  WatchList = 'WatchList',
}

export type MyListStackParameterList = {
  [MyListStackScreenNames.OfflineStack]: undefined;
  [MyListStackScreenNames.WatchList]: undefined;
};

export type MyListStackWatchListScreenProps = NativeStackScreenProps<
  MyListStackParameterList,
  MyListStackScreenNames.WatchList
>;
