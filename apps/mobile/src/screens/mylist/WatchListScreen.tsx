import React, { useRef } from 'react';

import { IWatchListSeries } from '@aniwatch/shared';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, ActivityIndicator, FlatList } from 'react-native';

import { useInfiniteQueryUserWatchList } from '../../api/hooks';
import { WatchListElement } from '../../components/watch-list';
import {
  MyListStackWatchListScreenProps,
  RootStackScreenNames,
  SeriesStackScreenNames,
} from '../../routes';
import { colors } from '../../styles';

export const WatchListScreen = ({}: MyListStackWatchListScreenProps) => {
  const navigation = useNavigation<any>();
  const listRef = useRef<FlatList>(null);
  const { api } = useInfiniteQueryUserWatchList();

  const renderItem = ({ item }: { item: IWatchListSeries }) => (
    <WatchListElement
      anime={item}
      handlePageChange={() => {
        navigation.navigate(RootStackScreenNames.SeriesStack, {
          screen: SeriesStackScreenNames.Series,
          params: {
            title: item.title,
            id: item.animeId,
          },
        });
      }}
    />
  );

  return (
    <>
      {api.isLoading ? <ActivityIndicator size="large" /> : null}
      {api.data ? (
        <FlatList
          contentContainerStyle={[styles.flatListContent]}
          contentInsetAdjustmentBehavior="automatic"
          data={api.data.pages.flatMap(page => page.data)}
          keyExtractor={(_, index) => index.toString()}
          numColumns={1}
          onEndReached={() => api.fetchNextPage()}
          onEndReachedThreshold={1}
          onRefresh={api.refetch}
          ref={listRef}
          refreshing={api.isRefetching}
          renderItem={renderItem}
          style={[styles.flatList]}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.color,
    marginHorizontal: 0,
  },
  flatList: {
    marginHorizontal: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
    backgroundColor: colors.accent.color,
  },
  flatListContent: {
    flexGrow: 1,
  },
});
