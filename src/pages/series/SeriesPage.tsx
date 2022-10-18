import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { format } from 'date-fns';
import WebView from 'react-native-webview';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Chip, Text } from 'react-native-paper';

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
  style = [],
}: {
  name: string;
  value: any;
  style?: StyleProp<ViewStyle>[];
}) => {
  return (
    <View style={[styles.quickInfoContainer, ...style]}>
      <Text style={[isTV ? styles.titleType : null, darkStyle.font]}>
        {name}
      </Text>
      <Text style={[isTV ? null : styles.titleType, darkStyle.font]}>
        {value}
      </Text>
    </View>
  );
};

export let animeId: number;

const SeriesPage = ({ navigation, route }: SeriesPageProps) => {
  const apiClient = new APIClient();
  const { title } = route.params;
  const { data } = useQuery<AnimeDetails>(['anime', title, 'details'], () =>
    apiClient.getAnimeDetails(title),
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
            <FocusButton
              icon="view-list"
              onPress={() => {
                navigation.navigate(RoutesNames.Episodes, {
                  title: data.title.romaji,
                  numOfAiredEpisodes:
                    data.nextAiringEpisode?.episode ?? data.episodes,
                });
              }}
              style={[]}>
              List of episodes
            </FocusButton>
            <View style={[globalStyle.spacer]} />
            <Text variant="headlineLarge" style={darkStyle.font}>
              {data.title.romaji}
            </Text>
            <Text variant="titleSmall" style={darkStyle.font}>
              {data.title.english}
            </Text>
            <Text
              variant="bodyMedium"
              style={[darkStyle.font, globalStyle.spacer]}>
              {data.description.replace(/<[^>]*>?/gm, '')}
            </Text>
            <Text style={[styles.titleType, darkStyle.font]}>Genres</Text>
            <View style={styles.chipContainer}>
              {data.genres.map((genre, index) => {
                return (
                  <Chip key={index} style={styles.chipGenre}>
                    {genre}
                  </Chip>
                );
              })}
            </View>
            <ScrollView
              horizontal={true}
              style={[styles.quickInfoScroll, styles.categorySpacer]}>
              <QuickInfo
                name="Format"
                value={data.format}
                style={[styles.paddingLeft]}
              />
              <QuickInfo name="Episodes" value={data.episodes} />
              <QuickInfo name="Duration" value={`${data.duration} mins`} />
              <QuickInfo
                name="AniList Score"
                value={`${data.averageScore} / 100`}
              />
              <QuickInfo
                name="Season"
                value={`${data.season} ${data.seasonYear}`}
              />
            </ScrollView>
            {data.nextAiringEpisode && (
              <>
                <QuickInfo
                  name="Next Episode"
                  value={format(
                    new Date(data.nextAiringEpisode.airingAt * 1000),
                    'dd MM yyyy',
                  )}
                  style={[styles.marginV]}
                />
                <QuickInfo
                  name="Next Airing Episode"
                  value={data.nextAiringEpisode.episode}
                  style={[styles.marginV]}
                />
              </>
            )}
            <Text
              style={[styles.titleType, styles.categorySpacer, darkStyle.font]}>
              Trailer
            </Text>
            <WebView
              style={[styles.webview, globalStyle.spacer]}
              javaScriptEnabled={true}
              source={{
                uri: `https://www.youtube.com/embed/${data.trailer?.id}`,
              }}
            />
            <Text
              variant="bodySmall"
              style={[globalStyle.disclaimer, darkStyle.font]}>
              (Source: AniList)
            </Text>
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    width: '100%',
    maxWidth: 600,
    aspectRatio: 16 / 9,
  },
  scrollView: {},
  body: {
    paddingHorizontal: 20,
  },
  banner: {
    width: '100%',
    height: 100,
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
});

export default SeriesPage;
