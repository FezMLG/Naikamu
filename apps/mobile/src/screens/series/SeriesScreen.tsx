import React, { useState } from 'react';

import { BlurView } from 'expo-blur';
import { StyleSheet, View, Platform } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { useQuerySeriesDetails } from '../../api/hooks';
import {
  EpisodesButton,
  SeriesDetails,
  SeriesDetailsRelations,
  WatchListStatusSelect,
  ProgressiveImage,
  PageLayout,
  PlatformExplicit,
} from '../../components';
import { SeriesStackSeriesScreenProps } from '../../routes';
import { globalStyle, colors } from '../../styles';

export function SeriesScreen({ route }: SeriesStackSeriesScreenProps) {
  const { id } = route.params;
  const { data, isError, isLoading, refetch } = useQuerySeriesDetails(id);
  const [widthForStatus, setWidthForStatus] = useState(500);

  const scrollPosition = useSharedValue(0);
  const handleScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollPosition.value = event.contentOffset.y;
    },
  });

  const imageHeight = 300;
  const index = 0;
  const imageTranslate = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollPosition.value,
      [
        ((index - 1) * imageHeight) / 2,
        (index * imageHeight) / 2,
        ((index + 1) * imageHeight) / 2,
      ],
      [-100, 0, 100],
    );

    return {
      transform: [{ translateY }],
    };
  }, []);

  return (
    <Animated.ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
      <PageLayout.Loading isLoading={isLoading} />
      <PageLayout.Error isError={isError} refetch={refetch} />
      {data ? (
        <View
          style={[
            {
              backgroundColor: data.coverImage.color ?? colors.background.color,
            },
          ]}>
          <SeriesDetails.Poster
            altImage={data.coverImage.extraLarge}
            animationStyle={imageTranslate}
            bannerImage={data.coverImage.extraLarge}
          />
          <View style={styles.body}>
            <PlatformExplicit availablePlatforms={['ios']}>
              <ProgressiveImage
                key="blurryImage"
                source={data.coverImage.medium}
                style={StyleSheet.absoluteFill}
              />
              <BlurView
                intensity={75}
                style={[StyleSheet.absoluteFill]}
                tint="dark"
              />
            </PlatformExplicit>
            <SeriesDetails.Title
              english={data.title.english}
              romaji={data.title.romaji}
            />
            <SeriesDetails.SubTitle
              english={data.title.english}
              romaji={data.title.romaji}
            />
            <View style={globalStyle.marginTop} />
            <SeriesDetails.QuickInfoContainer data={data} />
            {data.nextAiringEpisode ? (
              <View style={globalStyle.marginTop} />
            ) : null}
            <SeriesDetails.NextEpisode
              airingAt={data.nextAiringEpisode?.airingAt}
              episode={data.nextAiringEpisode?.episode}
            />
            <View style={globalStyle.marginTop} />
            <EpisodesButton series={data} />
            <View style={globalStyle.marginTop} />
            <View
              onLayout={event =>
                setWidthForStatus(event.nativeEvent.layout.width)
              }
              style={styles.watchlistTrailerContainer}>
              <WatchListStatusSelect
                initialWatchStatus={data.watchStatus}
                parentWidth={widthForStatus}
                seriesId={data.id}
              />
              <SeriesDetails.Trailer trailer={data.trailer} />
            </View>
            <View style={globalStyle.marginTop} />
            <SeriesDetails.Genres
              color={data.coverImage.color}
              genres={data.genres}
            />
            <View style={globalStyle.marginTopSmall} />
            <SeriesDetails.AverageScore averageScore={data.averageScore} />
            <View style={globalStyle.marginTop} />
            <SeriesDetails.Description description={data.description} />
            <View style={globalStyle.marginTop} />
            <SeriesDetailsRelations relations={data.relations} />
            <View style={globalStyle.marginTop} />
            <SeriesDetails.DataSource sourceId={data.sourceId} />
          </View>
        </View>
      ) : null}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
    backgroundColor:
      Platform.OS === 'ios' ? 'transparent' : colors.background.color,
    paddingBottom: 16,
  },
  watchlistTrailerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    backgroundColor: colors.background.color,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
