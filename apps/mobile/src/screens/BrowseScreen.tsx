import React from 'react';

import { IAnimeListItem } from '@naikamu/shared';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useQuerySeriesList } from '../api/hooks';
import {
  SeasonYearSelectButtons,
  BrowseElement,
  PageLayout,
} from '../components';
import { useAnimatedHeader } from '../components/atoms/Animated';
import {
  BrowseStackBrowseScreenProps,
  RootStackScreenNames,
  SeriesStackScreenNames,
} from '../routes';
import { colors } from '../styles';
import { useLayoutMessageService } from '../services/layout-info';

const headerHeight = 120;

export function BrowseScreen({}: BrowseStackBrowseScreenProps) {
  const { setAndShowMessage } = useLayoutMessageService();
  const navigation = useNavigation<any>();
  const { api, currentSeason, season, year, setSeason, setYear } =
    useQuerySeriesList();
  const tabHeight = useBottomTabBarHeight();

  const { scrollHandler, animatedTransform, animatedHeight } =
    useAnimatedHeader(headerHeight);

  const renderItem = ({ item }: { item: IAnimeListItem }) => (
    <BrowseElement
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
    <PageLayout.Default
      style={[
        styles.container,
        {
          flex: api.data ? 0 : 1,
        },
      ]}>
      <SeasonYearSelectButtons
        animatedHeight={animatedHeight}
        animatedTransform={animatedTransform}
        currentSeason={currentSeason}
        season={season}
        setSeason={setSeason}
        setYear={setYear}
        year={year}
      />
      <PageLayout.Loading isLoading={api.isLoading} />
      <PageLayout.Error isError={api.isError} refetch={api.refetch} />
      {api.data ? (
        <Animated.FlatList
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{ height: tabHeight * 2, width: '100%' }}
          contentContainerStyle={[styles.flatListContent]}
          contentInsetAdjustmentBehavior="automatic"
          data={api.data.pages.flatMap(page => page.data)}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          onEndReached={() => api.fetchNextPage()}
          onEndReachedThreshold={1}
          onRefresh={api.refetch}
          onScroll={scrollHandler}
          refreshing={api.isRefetching}
          renderItem={renderItem}
          scrollEventThrottle={16}
        />
      ) : null}
    </PageLayout.Default>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.color,
    marginHorizontal: 0,
    alignItems: 'center',
  },
  flatListContent: {
    flexGrow: 1,
  },
});
