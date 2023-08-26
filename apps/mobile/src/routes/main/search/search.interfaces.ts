import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum SearchStackScreenNames {
  Search = 'Search',
  SearchResults = 'SearchResults',
}

export type SearchStackParameterList = {
  [SearchStackScreenNames.Search]: undefined;
  [SearchStackScreenNames.SearchResults]: { phrase: string };
};

export type SearchStackSearchScreenProps = NativeStackScreenProps<
  SearchStackParameterList,
  SearchStackScreenNames.Search
>;
export type SearchStackSearchResultsScreenProps = NativeStackScreenProps<
  SearchStackParameterList,
  SearchStackScreenNames.SearchResults
>;
