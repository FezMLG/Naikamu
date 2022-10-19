import { StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Dialog,
  FAB,
  Portal,
  Button,
  SegmentedButtons,
  TextInput,
} from 'react-native-paper';
import { useInfiniteQuery } from '@tanstack/react-query';

import BrowseElement from '../components/browse/BrowseElement';
import { maxWidth } from '../components/maxDimensions';
import { AnimeList, Media } from '../interfaces';
import { APIClient } from '../api/APIClient';
import { BrowsePageProps, RoutesNames } from '../routes/interfaces';
import { AnimeSeason } from '../enums/anime-season.enum';

const getAnimeSeason = (month: number = new Date().getMonth() + 1) => {
  switch (month) {
    case 1:
    case 2:
    case 3:
      return AnimeSeason.Winter;
    case 4:
    case 5:
    case 6:
      return AnimeSeason.Spring;
    case 7:
    case 8:
    case 9:
      return AnimeSeason.Summer;
    default:
      return AnimeSeason.Fall;
  }
};

const BrowsePage = ({ navigation }: BrowsePageProps) => {
  const apiClient = new APIClient();
  const [season, setSeason] = useState(getAnimeSeason());
  const [seasonYear, setSeasonYear] = useState(new Date().getFullYear());
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  const { isLoading, data, error, refetch, fetchNextPage, isRefetching } =
    useInfiniteQuery<AnimeList>(
      ['browse', season, seasonYear],
      ({ pageParam }) =>
        apiClient.getAnimeList({ page: pageParam, season, seasonYear }),
      {
        getNextPageParam: lastPage => lastPage.Page.pageInfo.currentPage + 1,
      },
    );
  const listRef = useRef<FlatList>(null);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;

  const renderItem = ({ item }: { item: Media }) => (
    <BrowseElement
      anime={item}
      handlePageChange={() => {
        navigation.navigate(RoutesNames.Series, {
          title: item.title.romaji,
        });
      }}
    />
  );

  if (error) {
    console.log(BrowsePage.name);
    console.log(error);
  }

  if (data) {
    console.log(data.pageParams);
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <SegmentedButtons
        value={season}
        onValueChange={value => setSeason(value as AnimeSeason)}
        buttons={[
          {
            value: AnimeSeason.Winter,
            label: 'Winter',
            icon: 'snowflake',
          },
          {
            value: AnimeSeason.Spring,
            label: 'Spring',
            icon: 'flower',
          },
          {
            value: AnimeSeason.Summer,
            label: 'Summer',
            icon: 'white-balance-sunny',
          },
          {
            value: AnimeSeason.Fall,
            label: 'Fall',
            icon: 'leaf',
          },
        ]}
      />
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
      <FAB
        icon={'magnify'}
        style={styles.menu}
        onPress={() => setVisible(true)}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <TextInput
              keyboardType={'numeric'}
              label="Year"
              value={seasonYear.toString()}
              onChangeText={text => setSeasonYear(Number(text))}
            />
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={hideDialog}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
});

export default BrowsePage;
