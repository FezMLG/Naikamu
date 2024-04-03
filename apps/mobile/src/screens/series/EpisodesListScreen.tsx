import React, { useEffect, useRef, useState } from 'react';

import { Button, ButtonText } from '@gluestack-ui/themed';
import { AnimeEpisode } from '@naikamu/shared';
import _ from 'lodash';
import {
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useQuerySeriesEpisodes } from '../../api/hooks';
import { Episode, PageLayout, useLayout } from '../../components';
import { UpcomingEpisode } from '../../components/episode/UpcomingEpisode';
import { useTranslate } from '../../i18n/useTranslate';
import { SeriesStackEpisodeScreenProps } from '../../routes';
import { useActiveSeriesStore } from '../../services';
import {
  colors,
  DarkColor,
  darkStyle,
  defaultRadius,
  fontStyles,
  globalStyle,
} from '../../styles';

export const EpisodeNumber = ({
  items,
  onPress,
}: {
  items: AnimeEpisode[];
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    style={[
      {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'transparent',
        backgroundColor: DarkColor.C800,
        borderRadius: defaultRadius,
        paddingHorizontal: 15,
        marginTop: 15,
      },
    ]}>
    <Text style={[fontStyles.normal, colors.textLight, { textAlign: 'left' }]}>
      {items.at(0)?.number} - {items.at(-1)?.number}
    </Text>
    <Icon name="chevron-right" size={20} style={[colors.textLight]} />
  </Pressable>
);

export function EpisodesListScreen({ route }: SeriesStackEpisodeScreenProps) {
  const series = useActiveSeriesStore(store => store.series);
  const [open, setOpen] = useState(false);

  const flatListRef = useRef<FlatList>(null);
  const { translate } = useTranslate();
  const layout = useLayout();
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
        <ScrollView>
          {_.chunk(episodes?.episodes, 20).map((item, index) => (
            <EpisodeNumber
              items={item}
              key={index}
              onPress={() => {
                flatListRef.current?.scrollToIndex({
                  index: (item.at(0)?.number ?? 1) - 1,
                  animated: true,
                });
              }}
            />
          ))}
        </ScrollView>
      )}>
      <PageLayout.Default margin={false} {...layout}>
        <PageLayout.Loading isLoading={isLoading} />
        <PageLayout.Error isError={isError} refetch={refetch} />
        {episodes ? (
          <>
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
              <Icon name="menu" size={30} style={[colors.accent]} />
            </Button>
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
