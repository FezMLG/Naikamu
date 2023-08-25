import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum SeriesStackScreenNames {
  Series = 'Series',
  Episodes = 'Episodes',
}

export type SeriesStackParamList = {
  [SeriesStackScreenNames.Series]: { title: string; id: number };
  [SeriesStackScreenNames.Episodes]: {
    id: string;
    title: string;
    numOfAiredEpisodes: number;
    posterUrl: string;
    episodeLength: number;
  };
};

export type SeriesStackSeriesScreenProps = NativeStackScreenProps<
  SeriesStackParamList,
  SeriesStackScreenNames.Series
>;
export type SeriesStackEpisodeScreenProps = NativeStackScreenProps<
  SeriesStackParamList,
  SeriesStackScreenNames.Episodes
>;
