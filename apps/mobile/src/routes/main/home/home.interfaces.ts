import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum HomeStackScreenNames {
  Home = 'Home',
}

export type HomeStackParameterList = {
  [HomeStackScreenNames.Home]: undefined;
};

export type HomeStackHomeScreenProps = NativeStackScreenProps<
  HomeStackParameterList,
  HomeStackScreenNames.Home
>;
