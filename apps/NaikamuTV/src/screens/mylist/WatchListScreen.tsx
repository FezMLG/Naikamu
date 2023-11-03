import React from 'react';

import { IWatchListSeries } from '@naikamu/shared';
import { useNavigation } from '@react-navigation/native';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { useInfiniteQueryUserWatchList } from '../../api/hooks';
import { ActivityIndicator, Button, WatchListElement } from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import { MyListStackWatchListScreenProps } from '../../routes';
import { useSelectedSeriesStore, useUserService } from '../../services';
import { colors } from '../../styles';

export const WatchListScreen = ({}: MyListStackWatchListScreenProps) => {
  const { translate } = useTranslate();
  const userService = useUserService();
  const selectedSeries = useSelectedSeriesStore(state => state.series);
  const { api } = useInfiniteQueryUserWatchList();
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: { item: IWatchListSeries }) => (
    <WatchListElement
      anime={item}
      // handlePageChange={() => {
      //   navigation.navigate(RootStackScreenNames.SeriesStack, {
      //     screen: SeriesStackScreenNames.Series,
      //     params: {
      //       title: item.title,
      //       id: item.animeId,
      //     },
      //   });
      // }}
    />
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      {/*<Header />*/}
      <View style={{ height: '45%' }}>
        {/*<Button*/}
        {/*  label={translate('auth.logout')}*/}
        {/*  onPress={() => userService.logoutUser()}*/}
        {/*  type="secondary"*/}
        {/*/>*/}
        <Text>{selectedSeries?.id}</Text>
        <Text>{selectedSeries?.title}</Text>
      </View>
      <View style={{ height: '55%' }}>
        <Text>Your watchlist</Text>
        {api.isLoading ? <ActivityIndicator size="large" /> : null}
        {api.data ? (
          <FlatList
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{ width: '100%' }}
            contentContainerStyle={[styles.flatListContent]}
            data={api.data.pages.flatMap(page => page.data)}
            keyExtractor={(_, index) => index.toString()}
            numColumns={5}
            onEndReached={() => api.fetchNextPage()}
            onEndReachedThreshold={1}
            onRefresh={api.refetch}
            refreshing={api.isRefetching}
            renderItem={renderItem}
            style={[styles.flatList]}
          />
        ) : (
          <Text style={colors.textLight}>No data</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background.color,
    marginHorizontal: 0,
  },
  flatList: {
    marginTop: 10,
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
