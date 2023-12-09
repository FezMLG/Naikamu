import React, { useRef } from 'react';

import { IWatchListSeries } from '@naikamu/shared';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, FlatList, Text, Animated, View } from 'react-native';

import { useInfiniteQueryUserWatchList } from '../../api/hooks';
import { PageLayout, useLayout } from '../../components';
import { useAnimatedHeader } from '../../components/atoms/Animated';
import {
  WatchListElement,
  WatchListFilters,
} from '../../components/watch-list';
import {
  MyListStackWatchListScreenProps,
  RootStackScreenNames,
  SeriesStackScreenNames,
} from '../../routes';
import { colors } from '../../styles';

const headerHeight = 100;

export const WatchListScreen = ({}: MyListStackWatchListScreenProps) => {
  const navigation = useNavigation<any>();
  const listRef = useRef<FlatList>(null);
  const { api } = useInfiniteQueryUserWatchList();
  const layout = useLayout();

  const { handleSnap, handleScroll, translateY } = useAnimatedHeader(
    headerHeight,
    listRef,
  );

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
    <PageLayout.Default
      {...layout}
      margin={false}
      style={[
        {
          flex: 0,
        },
      ]}>
      <WatchListFilters translateY={translateY} />
      <PageLayout.Loading isLoading={api.isLoading} />
      <PageLayout.Error isError={api.isError} refetch={api.refetch} />
      {api.data ? (
        <Animated.FlatList
          ListHeaderComponent={<View />}
          ListHeaderComponentStyle={{
            height: headerHeight / 2,
          }}
          contentContainerStyle={[styles.flatListContent]}
          contentInsetAdjustmentBehavior="automatic"
          data={api.data.pages.flatMap(page => page.data)}
          keyExtractor={(_, index) => index.toString()}
          numColumns={1}
          onEndReached={() => api.fetchNextPage()}
          onEndReachedThreshold={1}
          onMomentumScrollEnd={handleSnap}
          onRefresh={api.refetch}
          onScroll={handleScroll}
          ref={listRef}
          refreshing={api.isRefetching}
          renderItem={renderItem}
          style={[styles.flatList]}
        />
      ) : (
        <Text style={colors.textLight}>No data</Text>
      )}
    </PageLayout.Default>
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
  flatListContent: {
    flexGrow: 1,
    // paddingTop: headerHeight / 2,
  },
});
