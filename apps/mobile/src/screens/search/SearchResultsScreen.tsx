import React, { useRef, useState } from 'react';

import { Media } from '@aniwatch/shared';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  View,
  Text,
} from 'react-native';
import { FAB } from 'react-native-paper';

import { useQuerySearchSeriesList } from '../../api/hooks';
import { maxWidth } from '../../components';
import BrowseElement from '../../components/browse/BrowseElement';
import {
  BrowseStackScreenNames,
  BottomTabStackParamList as BottomTabStackParameterList,
  BottomTabStackScreenNames,
  SearchStackParamList as SearchStackParameterList,
  SearchStackScreenNames,
  SearchStackSearchResultsScreenProps,
  SeriesStackScreenNames,
  RootStackScreenNames,
} from '../../routes';
import { colors, fontStyles } from '../../styles';

export function SearchResultsScreen({
  route,
}: SearchStackSearchResultsScreenProps) {
  const navigation = useNavigation<any>();
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
        navigation.navigate(RootStackScreenNames.SeriesStack, {
          screen: SeriesStackScreenNames.Series,
          params: {
            title: item.title.romaji,
            id: item.id,
          },
          initial: false,
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
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{ width: '100%' }}
            ListHeaderComponent={
              <Text style={[fontStyles.subScreenHeader, colors.textLight]}>
                {phrase}
              </Text>
            }
            ListHeaderComponentStyle={{ marginHorizontal: 10 }}
            contentContainerStyle={[styles.flatListContent]}
            data={data.pages.flatMap(page => page.Page.media)}
            keyExtractor={(_, index) => index.toString()}
            numColumns={Math.floor(maxWidth() / 180)}
            onEndReached={() => fetchNextPage()}
            onEndReachedThreshold={1}
            onRefresh={refetch}
            onScroll={event => {
              setContentVerticalOffset(event.nativeEvent.contentOffset.y);
            }}
            ref={listRef}
            refreshing={isRefetching}
            renderItem={renderItem}
            style={[styles.flatList]}
          />
          {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
            <FAB
              icon="arrow-up-circle"
              onPress={() => {
                listRef.current?.scrollToOffset({ offset: 0, animated: true });
              }}
              style={styles.fab}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  flatList: {
    marginTop: 10,
  },
  flatListContent: {
    flexGrow: 1,
  },
});
