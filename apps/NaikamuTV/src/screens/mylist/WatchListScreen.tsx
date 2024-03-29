import React from 'react';

import { IWatchListSeries } from '@naikamu/shared';
import { useNavigation } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { useInfiniteQueryUserWatchList } from '../../api/hooks';
import { PageLayout, SeriesPreview, WatchListElement } from '../../components';
import {
  MyListStackWatchListScreenProps,
  RootStackScreenNames,
} from '../../routes';
import { colors, fontStyles } from '../../styles';
import { maxWidth } from '../../utils';

const numberOfColumns = Math.floor(maxWidth() / 160);

export const WatchListScreen = ({}: MyListStackWatchListScreenProps) => {
  const { api } = useInfiniteQueryUserWatchList();
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: { item: IWatchListSeries }) => (
    <WatchListElement
      anime={item}
      handlePageChange={() => {
        navigation.navigate(RootStackScreenNames.SeriesStack);
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTop}>
        <SeriesPreview />
      </View>
      <View style={styles.containerBottom}>
        <Text
          style={[colors.textLighter, fontStyles.normal, { marginLeft: 10 }]}>
          Your watchlist
        </Text>
        <PageLayout.Loading isLoading={api.isLoading} />
        <PageLayout.Error isError={api.isError} refetch={() => api.refetch()} />
        {api.data ? (
          <FlatList
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{ width: '100%' }}
            contentContainerStyle={[styles.flatListContent]}
            data={api.data.pages.flatMap(page => page.data)}
            keyExtractor={(_, index) => index.toString()}
            numColumns={numberOfColumns}
            onEndReached={() => api.fetchNextPage()}
            onEndReachedThreshold={1}
            onRefresh={api.refetch}
            refreshing={api.isRefetching}
            renderItem={renderItem}
            style={[styles.flatList]}
          />
        ) : (
          <PageLayout.Error
            isError
            refetch={() => {
              Sentry.captureException('API returned without data');
              api.refetch();
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTop: {
    height: '45%',
    flexDirection: 'row',
    flex: 1,
  },
  containerBottom: {
    height: '55%',
    marginTop: 10,
  },
  flatList: {
    marginTop: 10,
  },
  flatListContent: {
    flexGrow: 1,
  },
});
