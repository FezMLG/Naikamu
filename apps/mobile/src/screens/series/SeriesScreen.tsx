import React from 'react';

import { BlurView } from '@react-native-community/blur';
import { StyleSheet, ScrollView, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useQuerySeriesDetails } from '../../api/hooks';
import {
  EpisodesButton,
  SeriesDetails,
  SeriesDetailsRelations,
  WatchList,
  ProgressiveImage,
  PlatformExplicit,
  PageLayout,
  useLayout,
} from '../../components';
import { SeriesStackSeriesScreenProps } from '../../routes';
import { globalStyle, DarkColor, colors } from '../../styles';

export function SeriesScreen({
  route,
  navigation,
}: SeriesStackSeriesScreenProps) {
  const { id } = route.params;
  const layout = useLayout();
  const { data, isError, isLoading, refetch } = useQuerySeriesDetails(id);

  return (
    <PageLayout.Default margin={false} {...layout}>
      <PlatformExplicit availablePlatforms={['android']}>
        <Pressable onPress={() => navigation.goBack()} style={styles.closeIcon}>
          <Icon name="close" size={20} style={colors.textLight} />
        </Pressable>
      </PlatformExplicit>
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
    </PageLayout.Default>
  );
}

const styles = StyleSheet.create({
  scrollView: {},
  body: {
    paddingHorizontal: 16,
  },
  watchlistTrailerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50,
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
