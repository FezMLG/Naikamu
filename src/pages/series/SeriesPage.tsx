import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Platform,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Chip, Text } from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';

import { darkColor, darkStyle } from '../../styles/darkMode.style';
import { defaultRadius, globalStyle } from '../../styles/global.style';
import { FocusButton } from '../../components/FocusButton';
import { RoutesNames, SeriesPageProps } from '../../routes/interfaces';
import { AnimeDetails } from '../../interfaces';
import { APIClient } from '../../api/APIClient';

const { isTV } = Platform;
const QuickInfo = ({
  name,
  value,
  styleView = [],
  styleText = [],
}: {
  name: string;
  value: any;
  styleView?: StyleProp<ViewStyle>[];
  styleText?: StyleProp<TextStyle>[];
}) => {
  return (
    <View style={[styles.quickInfoContainer, ...styleView]}>
      <Text style={[isTV ? styles.titleType : null, darkStyle.font]}>
        {name}
      </Text>
      <Text style={[isTV ? null : styles.titleType, darkStyle.font, styleText]}>
        {value}
      </Text>
    </View>
  );
};

export let animeId: number;

const SeriesPage = ({ navigation, route }: SeriesPageProps) => {
  const apiClient = new APIClient();
  const { title, id } = route.params;
  const { data } = useQuery<AnimeDetails>(['anime', title, 'details'], () =>
    apiClient.getAnimeDetails(title, id),
  );

  return (
    <SafeAreaView style={[styles.container]}>
      {data ? (
        <ScrollView style={styles.scrollView}>
          <Image
            style={[styles.banner]}
            source={{
              uri: data.bannerImage
                ? data.bannerImage
                : data.coverImage.extraLarge,
            }}
          />
          <View style={styles.body}>
            <View style={[globalStyle.spacer]} />
            <Text variant="headlineLarge" style={darkStyle.font}>
              {data.title.romaji}
            </Text>
            {data.title.romaji !== data.title.english && (
              <Text variant="titleSmall" style={darkStyle.font}>
                {data.title.english}
              </Text>
            )}
            <View style={[globalStyle.spacer]} />
            <FocusButton
              icon="play-box-multiple"
              onPress={() => {
                navigation.navigate(RoutesNames.Episodes, {
                  title: data.title.romaji,
                  numOfAiredEpisodes: data.nextAiringEpisode?.episode
                    ? data.nextAiringEpisode?.episode - 1
                    : data.episodes,
                  posterUrl: data.coverImage.extraLarge,
                });
              }}
              style={[]}>
              See Episodes
            </FocusButton>
            <ScrollView
              horizontal={true}
              style={[styles.quickInfoScroll, styles.categorySpacer]}>
              {data.nextAiringEpisode && (
                <QuickInfo
                  name="Next Episode"
                  value={
                    'Ep ' +
                    data.nextAiringEpisode.episode +
                    ': ' +
                    format(
                      new Date(data.nextAiringEpisode.airingAt * 1000),
                      'dd/MM H:mm',
                    )
                  }
                  styleView={[styles.paddingLeft]}
                />
              )}
              <QuickInfo
                name="Format"
                value={data.format}
                styleView={[!data.nextAiringEpisode && styles.paddingLeft]}
              />
              <QuickInfo name="Episodes" value={data.episodes ?? '?'} />
              <QuickInfo name="Duration" value={`${data.duration} mins`} />
              <QuickInfo
                name="Status"
                value={data.status}
                styleText={[styles.textCapitalize]}
              />
              <QuickInfo
                name="AniList Score"
                value={`${data.averageScore} / 100`}
              />
              <QuickInfo
                name="Season"
                value={`${data.season} ${data.seasonYear}`}
                styleText={[styles.textCapitalize]}
              />
            </ScrollView>
            <Text
              variant="bodyMedium"
              style={[darkStyle.font, styles.categorySpacer]}>
              {data.description.replace(/<[^>]*>?/gm, '')}
            </Text>
            <View style={[styles.chipContainer, styles.categorySpacer]}>
              {data.genres.map((genre, index) => {
                return (
                  <Chip key={index} style={styles.chipGenre}>
                    {genre}
                  </Chip>
                );
              })}
            </View>
            {data.trailer && (
              <>
                <Text
                  style={[
                    styles.titleType,
                    styles.categorySpacer,
                    darkStyle.font,
                  ]}>
                  Trailer
                </Text>
                <YoutubePlayer
                  height={300}
                  videoId={data.trailer?.id}
                  webViewStyle={styles.marginV}
                />
              </>
            )}
            <Text
              variant="bodySmall"
              style={[globalStyle.disclaimer, darkStyle.font]}>
              (Source: AniList)
            </Text>
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
    paddingHorizontal: 20,
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipGenre: {
    marginRight: 10,
    marginVertical: 5,
  },
  titleType: {
    fontWeight: 'bold',
  },
  quickInfoContainer: {
    marginRight: 10,
  },
  quickInfoScroll: {
    paddingVertical: 10,
    backgroundColor: darkColor.C800,
    borderRadius: defaultRadius,
  },
  marginV: {
    marginVertical: 10,
  },
  paddingLeft: {
    paddingLeft: 20,
  },
  categorySpacer: {
    marginTop: 40,
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
});

export default SeriesPage;
