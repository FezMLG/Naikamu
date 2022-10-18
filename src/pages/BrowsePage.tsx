import { StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FAB } from 'react-native-paper';
import { useInfiniteQuery } from '@tanstack/react-query';

import BrowseElement from '../components/browse/BrowseElement';
import { maxWidth } from '../components/maxDimensions';
import { AnimeList, Media } from '../interfaces';
import { APIClient } from '../api/APIClient';

const perPage = 25;
const BrowsePage = ({ navigation }: any) => {
  const apiClient = new APIClient();
  const { isLoading, data, error, refetch, fetchNextPage } =
    useInfiniteQuery<AnimeList>(
      ['browse'],
      () =>
        apiClient.getAnimeList({
          perPage: perPage,
        }),
      {
        getNextPageParam: lastPage => lastPage.Page.pageInfo.currentPage + 1,
      },
    );
  const listRef = useRef<FlatList>(null);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;

  const renderItem = ({ item }: { item: Media }) => (
    <BrowseElement anime={item} navigation={navigation} />
  );

  if (error) {
    console.log(error);
  }

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
            contentContainerStyle={{ flexGrow: 1 }}
            keyExtractor={(_, index) => index.toString()}
            onEndReachedThreshold={1}
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
    right: 0,
    bottom: 0,
  },
});

export default BrowsePage;
