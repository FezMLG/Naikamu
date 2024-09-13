import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum RootStackScreenNames {
  Main = 'Main',
  SeriesStack = 'SeriesStack',
  NativePlayer = 'NativePlayer',
  WebViewPlayer = 'WebViewPlayer',
}

export type RootStackParameterList = {
  [RootStackScreenNames.Main]: undefined;
  [RootStackScreenNames.SeriesStack]: undefined;
  [RootStackScreenNames.NativePlayer]: {
    uri: string;
    seriesId: string;
    episodeTitle: string;
    episodeNumber: number;
    referer: string;
  };
  [RootStackScreenNames.WebViewPlayer]: {
    uri: string;
  };
};

export type RootStackNativePlayerScreenProps = NativeStackScreenProps<
  RootStackParameterList,
  RootStackScreenNames.NativePlayer
>;
export type RootStackWebViewPlayerScreenProps = NativeStackScreenProps<
  RootStackParameterList,
  RootStackScreenNames.WebViewPlayer
>;
