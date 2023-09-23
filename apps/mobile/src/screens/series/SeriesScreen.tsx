import React from 'react';

import { BlurView } from '@react-native-community/blur';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useQuerySeriesDetails } from '../../api/hooks';
import {
  EpisodesButton,
  SeriesDetails,
  SeriesDetailsRelations,
  WatchList,
  ActivityIndicator,
  ProgressiveImage,
  PlatformExplicit,
  Button,
  PageLayout,
} from '../../components';
import { SeriesStackSeriesScreenProps } from '../../routes';
import { globalStyle, DarkColor, colors, fontStyles } from '../../styles';

export function SeriesScreen({ route }: SeriesStackSeriesScreenProps) {
  const { id } = route.params;
  const { data, isError, isLoading, refetch } = useQuerySeriesDetails(id);

  return (
    <SafeAreaView style={[styles.container]}>
      <PageLayout.Loading isLoading={isLoading} />
      <PageLayout.Error isError={isError} refetch={refetch} />
      {data ? (
        <>
          <PlatformExplicit availablePlatforms={['ios']}>
            <ProgressiveImage
              key="blurryImage"
              source={data.coverImage.medium}
              style={StyleSheet.absoluteFill}
            />
            <BlurView
              blurAmount={75}
              blurType="dark"
              reducedTransparencyFallbackColor={DarkColor.C900}
              style={[StyleSheet.absoluteFill]}
            />
          </PlatformExplicit>
          <ScrollView style={styles.scrollView}>
            <SeriesDetails.Poster
              altImage={data.coverImage.extraLarge}
              bannerImage={data.coverImage.extraLarge}
            />
            <View style={styles.body}>
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
              <View style={styles.watchlistTrailerContainer}>
                <WatchList seriesId={data.id} watchStatus={data.watchStatus} />
                <SeriesDetails.Trailer trailer={data.trailer} />
              </View>
              <View style={globalStyle.marginTop} />
              <SeriesDetails.Genres
                color={data.coverImage.color}
                genres={data.genres}
              />
              <View style={globalStyle.marginTop} />
              <SeriesDetails.Description description={data.description} />
              <View style={globalStyle.marginTop} />
              <SeriesDetailsRelations relations={data.relations} />
              <View style={globalStyle.marginTop} />
              <SeriesDetails.DataSource sourceId={data.sourceId} />
            </View>
          </ScrollView>
        </>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {},
  body: {
    paddingHorizontal: 16,
  },
  watchlistTrailerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50,
  },
});
