import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum MyListScreenNames {
  Offline = 'Offline',
}

export type MyListParamList = {
  [MyListScreenNames.Offline]: undefined;
};

export type MyListOfflineScreenProps = NativeStackScreenProps<
  MyListParamList,
  MyListScreenNames.Offline
>;
