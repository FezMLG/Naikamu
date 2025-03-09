import React, { useEffect, useRef, useState } from 'react';

import { Button, ButtonText } from '@gluestack-ui/themed';
import { AnimeEpisode } from '@naikamu/shared';
import _ from 'lodash';
import { StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useQuerySeriesDetails, useQuerySeriesEpisodes } from '../../api/hooks';
import { Episode, EpisodeNumber, PageLayout } from '../../components';
import { UpcomingEpisode } from '../../components/episode/UpcomingEpisode';
import { useTranslate } from '../../i18n/useTranslate';
import { SeriesStackEpisodeScreenProps } from '../../routes';
import { useActiveSeriesStore } from '../../services';
import { colors, DarkColor, darkStyle, globalStyle } from '../../styles';

export function EpisodesListScreen({ route }: SeriesStackEpisodeScreenProps) {
  useQuerySeriesDetails(route.params.seriesId);
  const series = useActiveSeriesStore(store => store.series);
  const [open, setOpen] = useState(false);

  const flatListRef = useRef<FlatList>(null);
  const { translate } = useTranslate();
  const {
    data: episodes,
    isError,
    isLoading,
    refetch,
  } = useQuerySeriesEpisodes(route.params.seriesId, series.numOfAiredEpisodes);

  useEffect(() => {
    if (episodes) {
      const firstNotWatchedIndex = episodes.episodes.findIndex(
        episode => !episode.isWatched,
      );

      if (firstNotWatchedIndex > 0) {
        flatListRef.current?.scrollToIndex({
          index: firstNotWatchedIndex,
          animated: true,
        });
      }
    }
  }, [episodes]);

  const renderItem = ({ item }: { item: AnimeEpisode }) => (
    <Episode episodeNumber={item.number} />
  );

  return (
    <Drawer
      drawerStyle={{
        backgroundColor: DarkColor.C900,
      }}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      renderDrawerContent={() => (
        <ScrollView
          contentContainerStyle={{
            marginLeft: 20,
          }}>
          {_.chunk(episodes?.episodes, 20).map((item, index) => (
            <EpisodeNumber
              items={item}
              key={index}
              onPress={() => {
                setOpen(false);
                flatListRef.current?.scrollToIndex({
                  index: (item.at(0)?.number ?? 1) - 1,
                  animated: true,
                });
              }}
            />
          ))}
        </ScrollView>
      )}>
      <PageLayout.Default margin={false}>
        <PageLayout.Loading isLoading={isLoading} />
        <PageLayout.Error isError={isError} refetch={refetch} />
        {episodes ? (
          <>
            {episodes.episodes.length >= 20 ? (
              <Button
                action="primary"
                onPress={() => {
                  setOpen(!open);
                }}
                size="md"
                style={{
                  justifyContent: 'flex-end',
                  marginHorizontal: 10,
                }}
                variant="link">
                <ButtonText style={[colors.accent]}>Go to episode</ButtonText>
                {/*@ts-expect-error - Icon is not typed correctly*/}
                <Icon
                  name="menu-open"
                  size={24}
                  style={[colors.accent, { transform: [{ rotate: '180deg' }] }]}
                />
              </Button>
            ) : null}
            <FlatList
              ListFooterComponent={
                <>
                  {series.nextAiringEpisode?.episode ? (
                    <UpcomingEpisode />
                  ) : null}
                  <Text
                    style={[globalStyle.disclaimer, darkStyle.font]}
                    variant="bodySmall">
                    {translate('anime_episodes.disclaimer')}
                  </Text>
                </>
              }
              ListHeaderComponent={
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/logo_docchi.png')}
                  style={[styles.logo]}
                />
              }
              contentContainerStyle={[styles.flatListContent]}
              contentInsetAdjustmentBehavior="automatic"
              data={episodes.episodes}
              getItemLayout={(_data, index) => ({
                length: 110,
                offset: 110 * index,
                index,
              })}
              keyExtractor={(_episode, index) => index.toString()}
              numColumns={1}
              onRefresh={refetch}
              ref={flatListRef}
              refreshing={isLoading}
              renderItem={renderItem}
            />
          </>
        ) : null}
      </PageLayout.Default>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginTop: 10,
    height: 20,
    width: 75,
    opacity: 0.75,
  },
  flatListContent: {
    flexGrow: 1,
    marginHorizontal: 10,
  },
});
