import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum SeriesStackScreenNames {
  Series = 'Series',
  Episodes = 'Episodes',
}

export type SeriesStackParameterList = {
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
  SeriesStackParameterList,
  SeriesStackScreenNames.Series
>;
export type SeriesStackEpisodeScreenProps = NativeStackScreenProps<
  SeriesStackParameterList,
  SeriesStackScreenNames.Episodes
>;
