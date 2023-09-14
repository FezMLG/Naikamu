import React, { useRef, useState } from 'react';

import { AnimeDetails, Media } from '@aniwatch/shared';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, ActivityIndicator, FlatList, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useQuerySeriesList } from '../../api/hooks';
import { BrowseElement, SeasonYearSelectButtons } from '../../components';
import {
  MyListStackWatchListScreenProps,
  RootStackScreenNames,
  SeriesStackScreenNames,
} from '../../routes';
import { colors } from '../../styles';
import { WatchListElement } from '../../components/watch-list';

export const WatchListScreen = ({}: MyListStackWatchListScreenProps) => {
  const CONTENT_OFFSET_THRESHOLD = 300;
  const navigation = useNavigation<any>();
  const listRef = useRef<FlatList>(null);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const { api, season, year, setSeason, setYear } = useQuerySeriesList();
  const tabHeight = useBottomTabBarHeight();

  const renderItem = ({ item }: { item: AnimeDetails }) => (
    <WatchListElement
      anime={item}
      handlePageChange={() => {
        navigation.navigate(RootStackScreenNames.SeriesStack, {
          screen: SeriesStackScreenNames.Series,
          params: {
            title: item.title.romaji,
            id: item.id,
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
          data={api.data.pages.flatMap(page => page.Page.media)}
          keyExtractor={(_, index) => index.toString()}
          numColumns={1}
          onEndReached={() => api.fetchNextPage()}
          onEndReachedThreshold={1}
          onRefresh={api.refetch}
          onScroll={event => {
            setContentVerticalOffset(event.nativeEvent.contentOffset.y);
          }}
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
