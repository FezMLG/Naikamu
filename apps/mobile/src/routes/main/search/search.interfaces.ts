import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { SeriesStackParamList } from '../series';

export enum SearchStackScreenNames {
  Search = 'Search',
  SearchResults = 'SearchResults',
  SearchResultsSeries = 'SearchResultsSeries',
}

export type SearchStackParamList = {
  [SearchStackScreenNames.Search]: undefined;
  [SearchStackScreenNames.SearchResults]: { phrase: string };
  [SearchStackScreenNames.SearchResultsSeries]: NavigatorScreenParams<SeriesStackParamList>;
};

export type SearchStackSearchScreenProps = NativeStackScreenProps<
  SearchStackParamList,
  SearchStackScreenNames.Search
>;
export type SearchStackSearchResultsScreenProps = NativeStackScreenProps<
  SearchStackParamList,
  SearchStackScreenNames.SearchResults
>;
