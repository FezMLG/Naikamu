import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Platform,
  View,
} from 'react-native';
import React from 'react';
import { NetworkStatus, useQuery } from '@apollo/client';
import { LIST_OF_ANIME } from '../api/graphql/anilist/listOfAnime';
import { IALListOfAnime, Media } from '../interfaces';
import { darkStyle } from '../styles/darkMode.style';
import BrowseElement from '../components/browse/BrowseElement';
import { SafeAreaView } from 'react-native-safe-area-context';
import { maxWidth } from '../components/maxDimensions';

const perPage = 25;
const BrowsePage = ({ navigation }: any) => {
  const { isTV } = Platform;
  const { loading, data, error, fetchMore, refetch, networkStatus } =
    useQuery<IALListOfAnime>(LIST_OF_ANIME, {
      variables: {
        page: 1,
        perPage: perPage,
      },
      notifyOnNetworkStatusChange: true,
    });

  const handleOnEndReached = () => {
    if (data?.Page.pageInfo.hasNextPage) {
      console.log('has next page');
      return fetchMore({
        variables: {
          page: data.Page.pageInfo.currentPage + 1,
          perPage: perPage,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEntries = fetchMoreResult.Page.media;
          return {
            Page: {
              pageInfo: fetchMoreResult.Page.pageInfo,
              media: [...previousResult.Page.media, ...newEntries],
            },
          };
        },
      });
    }
  };

  const refreshing = networkStatus === NetworkStatus.refetch;
  // prevent the loading indicator from appearing while refreshing
  if (loading && data?.Page.media.length === 0 && !refreshing) {
    return (
      <View>
        <ActivityIndicator size="large" color="rgb(0, 122, 255)" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: Media }) => (
    <BrowseElement anime={item} navigation={navigation} />
  );

  if (error) {
    console.log(error);
  }

  return (
    <SafeAreaView style={[styles.container, darkStyle.background]}>
      {data && (
        <FlatList
          data={data.Page.media}
          renderItem={renderItem}
          initialNumToRender={isTV ? 8 : 4}
          numColumns={Math.floor(maxWidth() / 240)}
          contentContainerStyle={{ flexGrow: 1 }}
          keyExtractor={() => Math.random().toString()}
          onEndReachedThreshold={1}
          onEndReached={handleOnEndReached}
          onRefresh={refetch}
          refreshing={refreshing}
        />
      )}
      {loading && <ActivityIndicator size="large" />}
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
});

export default BrowsePage;
