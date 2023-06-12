import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum MyListScreenNames {
  OfflineStack = 'OfflineStack',
}

export type MyListParamList = {
  [MyListScreenNames.OfflineStack]: undefined;
};

export type MyListOfflineScreenProps = NativeStackScreenProps<
  MyListParamList,
  MyListScreenNames.OfflineStack
>;
