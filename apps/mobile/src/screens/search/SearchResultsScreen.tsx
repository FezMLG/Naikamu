import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  View,
  Text,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { FAB } from 'react-native-paper';

import { Media } from '@aniwatch/shared';

import BrowseElement from '../../components/browse/BrowseElement';
import { SearchResultsScreenProps, ScreenNames } from '../../routes/main';
import { maxWidth } from '../../components/maxDimensions';
import { useQuerySearchSeriesList } from '../../api/hooks';
import { colors, fontStyles } from '../../styles';

const SearchResultsScreen = ({
  navigation,
  route,
}: SearchResultsScreenProps) => {
  const CONTENT_OFFSET_THRESHOLD = 300;
  const { phrase } = route.params;
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const listRef = useRef<FlatList>(null);

  const { isLoading, data, refetch, fetchNextPage, isRefetching } =
    useQuerySearchSeriesList(phrase);

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
      {isLoading && <ActivityIndicator size="large" />}
      {data && (
        <View>
          <FlatList
            style={[styles.flatList]}
            ref={listRef}
            data={data.pages.map(page => page.Page.media).flat()}
            renderItem={renderItem}
            numColumns={Math.floor(maxWidth() / 180)}
            contentContainerStyle={[styles.flatListContent]}
            keyExtractor={(_, index) => index.toString()}
            onEndReachedThreshold={1}
            refreshing={isRefetching}
            onRefresh={refetch}
            onEndReached={() => fetchNextPage()}
            onScroll={event => {
              setContentVerticalOffset(event.nativeEvent.contentOffset.y);
            }}
            ListHeaderComponent={
              <Text style={[fontStyles.subScreenHeader, colors.textLight]}>
                {phrase}
              </Text>
            }
            ListHeaderComponentStyle={{ marginHorizontal: 10 }}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{ width: '100%' }}
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
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 120,
  },
  flatList: {
    marginTop: 10,
  },
  flatListContent: {
    flexGrow: 1,
  },
});

export default SearchResultsScreen;
