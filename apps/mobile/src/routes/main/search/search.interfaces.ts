import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { SeriesStackParamList } from '../series';

export enum SearchStackScreenNames {
  Search = 'Search',
  SearchResults = 'SearchResults',
}

export type SearchStackParamList = {
  [SearchStackScreenNames.Search]: undefined;
  [SearchStackScreenNames.SearchResults]: { phrase: string };
};

export type SearchStackSearchScreenProps = NativeStackScreenProps<
  SearchStackParamList,
  SearchStackScreenNames.Search
>;
export type SearchStackSearchResultsScreenProps = NativeStackScreenProps<
  SearchStackParamList,
  SearchStackScreenNames.SearchResults
>;
