import React, { useRef, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FAB } from 'react-native-paper';

import { Media } from '@aniwatch/shared';

import BrowseElement from '../components/browse/BrowseElement';
import { maxWidth } from '../components/maxDimensions';
import { BrowseScreenProps, ScreenNames } from '../routes/main';
import { SeasonYearSelectButtons } from '../components';
import { useQuerySeriesList } from '../api/hooks';

const BrowseScreen = ({ navigation }: BrowseScreenProps) => {
  const CONTENT_OFFSET_THRESHOLD = 300;
  const listRef = useRef<FlatList>(null);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const { api, season, year, setSeason, setYear } = useQuerySeriesList();

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
      <SeasonYearSelectButtons
        season={season}
        setSeason={setSeason}
        year={year}
        setYear={setYear}
      />
      {api.isLoading ? <ActivityIndicator size="large" /> : null}
      {api.data ? (
        <View>
          <FlatList
            style={styles.flatList}
            ref={listRef}
            data={api.data.pages.map(page => page.Page.media).flat()}
            renderItem={renderItem}
            numColumns={Math.floor(maxWidth() / 180)}
            contentContainerStyle={styles.flatListContent}
            keyExtractor={(_, index) => index.toString()}
            onEndReachedThreshold={1}
            refreshing={api.isRefetching}
            onRefresh={api.refetch}
            onEndReached={() => api.fetchNextPage()}
            onScroll={event => {
              setContentVerticalOffset(event.nativeEvent.contentOffset.y);
            }}
          />
          {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
            <FAB
              icon={'arrow-up-circle'}
              style={styles.fab}
              onPress={() => {
                listRef.current?.scrollToOffset({ offset: 0, animated: true });
              }}
            />
          )}
        </View>
      ) : null}
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
  menu: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  flatList: {
    marginTop: 10,
  },
  flatListContent: {
    flexGrow: 1,
  },
});

export default BrowseScreen;
