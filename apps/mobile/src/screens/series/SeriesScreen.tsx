import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { globalStyle } from '../../styles/global.style';
import { SeriesScreenProps } from '../../routes/main';
import { useQuerySeriesDetails } from '../../api/hooks';
import {
  EpisodesButton,
  SeriesDetails,
  SeriesDetailsRelations,
} from '../../components/SeriesDetails';

const SeriesScreen = ({ route }: SeriesScreenProps) => {
  const { id } = route.params;
  const { data } = useQuerySeriesDetails(id);

  return (
    <SafeAreaView style={[styles.container]}>
      {data ? (
        <ScrollView style={styles.scrollView}>
          <SeriesDetails.Poster
            bannerImage={data.bannerImage}
            altImage={data.coverImage.extraLarge}
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
            <View style={globalStyle.marginTop} />
            <SeriesDetails.NextEpisode
              airingAt={data.nextAiringEpisode?.airingAt}
              episode={data.nextAiringEpisode?.episode}
            />
            <View style={globalStyle.marginTop} />
            <EpisodesButton series={data} />
            <View style={globalStyle.marginTop} />
            <SeriesDetails.Genres
              genres={data.genres}
              color={data.coverImage.color}
            />
            <View style={globalStyle.marginTop} />
            <SeriesDetails.Description description={data.description} />
            <View style={globalStyle.marginTop} />
            <SeriesDetailsRelations relations={data.relations} />
            <View style={globalStyle.marginTop} />
            <SeriesDetails.DataSource />
          </View>
        </ScrollView>
      ) : (
        <View style={globalStyle.centered}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {},
  body: {
    paddingHorizontal: 16,
  },
});

export default SeriesScreen;
