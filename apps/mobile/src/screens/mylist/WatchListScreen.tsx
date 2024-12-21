import React from 'react';

import { IWatchListSeries } from '@naikamu/shared';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useInfiniteQueryUserWatchList } from '../../api/hooks';
import { PageLayout } from '../../components';
import { useAnimatedHeader } from '../../components/atoms/Animated';
import {
  WatchListElement,
  WatchListFilters,
} from '../../components/watch-list';
import { useTranslate } from '../../i18n/useTranslate';
import {
  MyListStackWatchListScreenProps,
  RootStackScreenNames,
  SeriesStackScreenNames,
} from '../../routes';
import { colors, fontStyles } from '../../styles';

const headerHeight = 100;

export const WatchListScreen = ({}: MyListStackWatchListScreenProps) => {
  const navigation = useNavigation<any>();
  const { api } = useInfiniteQueryUserWatchList();
  const { translate } = useTranslate();

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
            <View
              style={{
                margin: 16,
              }}>
              <View
                style={[
                  styles.emptyStateContainerSize,
                  styles.emptyStateContainer,
                ]}>
                <Icon
                  color={colors.textLighter.color}
                  name="playlist-plus"
                  size={48}
                />
                <Text style={[fontStyles.normal, colors.textLight]}>
                  {translate('watch_list.emptyState')}
                </Text>
              </View>
            </View>
          )}
        </>
      ) : null}
    </PageLayout.Default>
  );
};

const styles = StyleSheet.create({
  emptyStateContainerSize: {
    width: '100%',
    height: 180,
  },
  emptyStateContainer: {
    borderColor: colors.accent.color,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
