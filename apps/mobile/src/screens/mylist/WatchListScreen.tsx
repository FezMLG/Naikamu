import React from 'react';

import { IWatchListSeries } from '@naikamu/shared';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';

import { useInfiniteQueryUserWatchList } from '../../api/hooks';
import { PageLayout } from '../../components';
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
  const { api } = useInfiniteQueryUserWatchList();

  const { scrollHandler, animatedHeight, animatedTransform } =
    useAnimatedHeader(headerHeight);

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
      margin={false}
      style={[
        {
          flex: 0,
        },
      ]}>
      <WatchListFilters
        animatedHeight={animatedHeight}
        animatedTransform={animatedTransform}
      />
      <PageLayout.Loading isLoading={api.isLoading} />
      <PageLayout.Error isError={api.isError} refetch={api.refetch} />
      {api.data ? (
        <>
          {api.data.pages[0].pageInfo.total > 0 ? (
            <Animated.FlatList
              contentContainerStyle={[styles.flatListContent]}
              contentInsetAdjustmentBehavior="automatic"
              data={api.data.pages.flatMap(page => page.data)}
              keyExtractor={(_, index) => index.toString()}
              numColumns={1}
              onEndReached={() => api.fetchNextPage()}
              onEndReachedThreshold={1}
              onRefresh={api.refetch}
              onScroll={scrollHandler}
              refreshing={api.isRefetching}
              renderItem={renderItem}
              scrollEventThrottle={16}
              style={[styles.flatList]}
            />
          ) : (
            <Text style={colors.textLight}>No data</Text>
          )}
        </>
      ) : null}
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
    height: '100%',
  },
  flatListContent: {
    flexGrow: 1,
  },
});
