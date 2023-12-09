import React, { useRef } from 'react';

import { IWatchListSeries } from '@naikamu/shared';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';

import { useInfiniteQueryUserWatchList } from '../../api/hooks';
import { PageLayout, useLayout } from '../../components';
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

export const getCloser = (value: number, checkOne: number, checkTwo: number) =>
  Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

export const WatchListScreen = ({}: MyListStackWatchListScreenProps) => {
  const navigation = useNavigation<any>();
  const listRef = useRef<FlatList>(null);
  const { api } = useInfiniteQueryUserWatchList();
  const layout = useLayout();

  const scrollY = useRef(new Animated.Value(0));
  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: scrollY.current },
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );
  const scrollYClamped = Animated.diffClamp(scrollY.current, 0, headerHeight);

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -(headerHeight / 2)],
  });

  const translateYNumber = useRef<number>();

  translateY.addListener(({ value }) => {
    translateYNumber.current = value;
  });

  const handleSnap = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = nativeEvent.contentOffset.y;

    if (
      !(
        translateYNumber.current === 0 ||
        translateYNumber.current === -headerHeight / 2
      ) &&
      listRef.current
    ) {
      listRef.current.scrollToOffset({
        offset:
          getCloser(translateYNumber.current!, -headerHeight / 2, 0) ===
          -headerHeight / 2
            ? offsetY + headerHeight / 2
            : offsetY - headerHeight / 2,
      });
    }
  };

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
      {api.isLoading ? <ActivityIndicator size="large" /> : null}
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
