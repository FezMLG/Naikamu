import React, { useRef, useState } from 'react';

import { AnimeEpisode } from '@naikamu/shared';
import {
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import { useQuerySeriesEpisodes } from '../../api/hooks';
import { Episode, IconButton, PageLayout, Selectable } from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import { SeriesStackEpisodeScreenProps } from '../../routes';
import {
  colors,
  DarkColor,
  darkStyle,
  defaultRadius,
  fontStyles,
  globalStyle,
} from '../../styles';

function sliceIntoChunks<T>(array: T[], chunkSize = 10) {
  const result: T[][] = [];

  for (let index = 0; index < array.length; index += chunkSize) {
    const chunk = array.slice(index, index + chunkSize);

    result.push(chunk);
  }

  return result;
}

export const EpisodeNumber = ({
  items,
  onPress,
}: {
  items: AnimeEpisode[];
  onPress: () => void;
}) => (
  <Selectable
    customStyles={[
      {
        justifyContent: 'center',
        width: '100%',
        height: 40,
        maxWidth: 200,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'transparent',
        backgroundColor: DarkColor.C800,
        borderRadius: defaultRadius,
        paddingHorizontal: 10,
        marginTop: 15,
      },
    ]}
    onPress={onPress}>
    <Text style={[fontStyles.text, colors.textLight]}>
      {items.at(0)?.number} - {items.at(-1)?.number}
    </Text>
  </Selectable>
);

export function EpisodesListScreen({
  navigation,
}: SeriesStackEpisodeScreenProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [episodeHeight, setEpisodeHeight] = useState(190 * 12);

  const { translate } = useTranslate();
  const {
    data: episodes,
    isError,
    isLoading,
    refetch,
  } = useQuerySeriesEpisodes();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageLayout.Loading isLoading={isLoading} />
      <PageLayout.Error isError={isError} refetch={refetch} />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <ScrollView
          style={{
            width: '30%',
            paddingLeft: 16,
            paddingTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <IconButton
              icon="chevron-left"
              onPress={() => {
                navigation.goBack();
              }}
              size={24}
            />
            <Text style={[fontStyles.header, colors.textLighter]}>
              Episodes
            </Text>
          </View>
          {episodes
            ? sliceIntoChunks(episodes.episodes).map((item, index) => (
                <EpisodeNumber
                  items={item}
                  key={index}
                  onPress={() => {
                    scrollViewRef.current?.scrollTo({
                      y:
                        ((item.at(0)?.number ?? 1) - 1) *
                        Math.floor(episodeHeight / episodes.episodes.length),
                      animated: true,
                    });
                  }}
                />
              ))
            : null}
        </ScrollView>
        <ScrollView ref={scrollViewRef} style={styles.scrollView}>
          <Image
            resizeMode="contain"
            //eslint-disable-next-line unicorn/prefer-module
            source={require('../../assets/logo_docchi.png')}
            style={[styles.logo]}
          />
          <View
            onLayout={event =>
              setEpisodeHeight(event.nativeEvent.layout.height)
            }>
            {episodes
              ? episodes.episodes.map(
                  (episode: AnimeEpisode, index: number) => (
                    <Episode
                      episodeOld={episode}
                      isWatched={episode.isWatched}
                      key={index}
                    />
                  ),
                )
              : null}
          </View>
          <Text style={[globalStyle.disclaimer, darkStyle.font]}>
            {translate('anime_episodes.disclaimer')}
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: '70%',
    marginHorizontal: 10,
  },
  logo: {
    marginTop: 10,
    height: 20,
    width: 75,
    opacity: 0.75,
  },
});
