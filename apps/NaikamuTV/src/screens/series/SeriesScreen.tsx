import React from 'react';

import { StyleSheet, ScrollView, View, SafeAreaView, Text } from 'react-native';

import {
  EpisodesButton,
  IconButton,
  PageLayout,
  SeriesDetails,
} from '../../components';
import { SeriesStackSeriesScreenProps } from '../../routes';
import { useSelectedSeriesStore } from '../../services';
import { globalStyle, colors, fontStyles } from '../../styles';

export function SeriesScreen({ navigation }: SeriesStackSeriesScreenProps) {
  const data = useSelectedSeriesStore(store => store.details);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {data ? null : (
        <IconButton icon="chevron-left" onPress={() => navigation.goBack()} />
      )}
      {data ? (
        <>
          <ScrollView style={styles.scrollView}>
            <IconButton
              icon="chevron-left"
              onPress={() => navigation.goBack()}
            />
            <SeriesDetails.Poster
              altImage={data.coverImage.extraLarge}
              bannerImage={data.bannerImage}
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
              <Text
                style={[
                  {
                    color: data.coverImage.color ?? colors.accent.color,
                  },
                  fontStyles.normal,
                ]}>
                {data.studios[0].name}
              </Text>
              <View style={globalStyle.marginTopSmall} />
              <SeriesDetails.QuickInfoContainer data={data} />
              <View style={globalStyle.marginTop} />
              <SeriesDetails.AverageScore averageScore={data.averageScore} />
              <View style={globalStyle.marginTop} />
              <SeriesDetails.Genres
                color={data.coverImage.color}
                genres={data.genres}
              />
              <View style={globalStyle.marginTop} />
              <SeriesDetails.NextEpisode
                airingAt={data.nextAiringEpisode?.airingAt}
                episode={data.nextAiringEpisode?.episode}
              />
              {data.nextAiringEpisode ? (
                <View style={globalStyle.marginTopSmall} />
              ) : null}
              <EpisodesButton />
              <View style={globalStyle.marginTop} />
              {/*<View style={styles.watchlistTrailerContainer}>*/}
              {/*  <WatchList seriesId={data.id} watchStatus={data.watchStatus} />*/}
              {/*  <SeriesDetails.Trailer trailer={data.trailer} />*/}
              {/*</View>*/}
              <View style={globalStyle.marginTopSmall} />
              <SeriesDetails.Description description={data.description} />
              {/*<View style={globalStyle.marginTop} />*/}
              {/*<SeriesDetailsRelations relations={data.relations} />*/}
              {/*<View style={globalStyle.marginTop} />*/}
              <SeriesDetails.DataSource sourceId={data.sourceId} />
            </View>
          </ScrollView>
        </>
      ) : (
        <PageLayout.Loading isLoading={true} />
      )}
    </SafeAreaView>
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
});
