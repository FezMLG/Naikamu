import { StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FAB } from 'react-native-paper';
import { useInfiniteQuery } from '@tanstack/react-query';

import { APIClient } from '../../api/APIClient';
import { AnimeList, Media } from '../../interfaces';
import BrowseElement from '../../components/browse/BrowseElement';
import { SearchResultsPageProps, ScreenNames } from '../../routes/main';
import { maxWidth } from '../../components/maxDimensions';

const SearchResultsScreen = ({ navigation, route }: SearchResultsPageProps) => {
  const CONTENT_OFFSET_THRESHOLD = 300;
  const { phrase } = route.params;
  const apiClient = new APIClient();
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const listRef = useRef<FlatList>(null);

  const { isLoading, data, refetch, fetchNextPage, isRefetching } =
    useInfiniteQuery<AnimeList>(
      ['search results', phrase],
      () => apiClient.getAnimeList({}),
      {
        getNextPageParam: lastPage => lastPage.Page.pageInfo.currentPage + 1,
      },
    );

  const renderItem = ({ item }: { item: Media }) => (
    <BrowseElement
      anime={item}
      handlePageChange={() => {
        navigation.navigate(ScreenNames.Series, {
          title: item.title.romaji,
          id: item.id,
        });
      }}
    />
  );

  return (
    <SafeAreaView style={[styles.container]}>
      {isLoading && <ActivityIndicator size="large" />}
      {data && (
        <>
          <FlatList
            ref={listRef}
            data={data.pages.map(page => page.Page.media).flat()}
            renderItem={renderItem}
            numColumns={Math.floor(maxWidth() / 240)}
            contentContainerStyle={styles.flatList}
            keyExtractor={(_, index) => index.toString()}
            onEndReachedThreshold={1}
            refreshing={isRefetching}
            onRefresh={refetch}
            onEndReached={() => fetchNextPage()}
            onScroll={event => {
              setContentVerticalOffset(event.nativeEvent.contentOffset.y);
            }}
          />
          {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
            <FAB
              icon={'arrow-up-circle'}
              style={styles.fab}
              onPress={() => {
                listRef.current!.scrollToOffset({ offset: 0, animated: true });
              }}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  autoGrid: {
    flexGrow: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  poster: {
    width: 200,
    height: 300,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  title: {
    width: 200,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  card: {
    height: 350,
    width: 200,
    marginVertical: 10,
  },
  wrapperFocused: {
    borderColor: 'purple',
    borderWidth: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
  },
  menu: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  flatList: {
    flexGrow: 1,
  },
});

export default SearchResultsScreen;
