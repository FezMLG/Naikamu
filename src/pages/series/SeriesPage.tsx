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
import { RoutesNames } from '../../routes/RoutesNames.enum';
import { useQuery } from '@apollo/client';
import { IALTitleInfo } from '../../interfaces';
import { TITLE_INFO } from '../../api/graphql/anilist/titleInfo';
import WebView from 'react-native-webview';
import { darkColor, darkStyle } from '../../styles/darkMode.style';
import { defaultRadius, globalStyle } from '../../styles/global.style';
import { ActivityIndicator, Chip, Text } from 'react-native-paper';
import { FocusButton } from '../../components/FocusButton';

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

const SeriesPage = ({ navigation, route }: any) => {
  const { id } = route.params;
  animeId = id;
  const { data } = useQuery<IALTitleInfo>(TITLE_INFO, {
    variables: {
      id,
    },
  });

  return (
    <SafeAreaView style={[styles.container]}>
      {data ? (
        <ScrollView style={styles.scrollView}>
          <Image
            style={[styles.banner]}
            source={{
              uri: data.Media.bannerImage
                ? data.Media.bannerImage
                : data.Media.coverImage.extraLarge,
            }}
          />
          <View style={styles.body}>
            <View style={[globalStyle.spacer]} />
            <FocusButton
              icon="view-list"
              onPress={() => {
                navigation.navigate(RoutesNames.Episodes, {
                  title: data.Media.title.romaji,
                });
              }}
              style={[]}>
              List of episodes
            </FocusButton>
            <View style={[globalStyle.spacer]} />
            <Text variant="headlineLarge" style={darkStyle.font}>
              {data.Media.title.romaji}
            </Text>
            <Text variant="titleSmall" style={darkStyle.font}>
              {data.Media.title.english}
            </Text>
            <Text
              variant="bodyMedium"
              style={[darkStyle.font, globalStyle.spacer]}>
              {data.Media.description.replace(/<[^>]*>?/gm, '')}
            </Text>
            <Text style={[styles.titleType, darkStyle.font]}>Genres</Text>
            <View style={styles.chipContainer}>
              {data.Media.genres.map((genre, index) => {
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
                value={data.Media.format}
                style={[styles.paddingLeft]}
              />
              <QuickInfo name="Episodes" value={data.Media.episodes} />
              <QuickInfo
                name="Duration"
                value={`${data.Media.duration} mins`}
              />
              <QuickInfo
                name="AniList Score"
                value={`${data.Media.averageScore} / 100`}
              />
              <QuickInfo
                name="Season"
                value={`${data.Media.season} ${data.Media.seasonYear}`}
              />
            </ScrollView>
            {data.Media.nextAiringEpisode && (
              <>
                <QuickInfo
                  name="Next Episode"
                  value={format(
                    new Date(data.Media.nextAiringEpisode.airingAt * 1000),
                    'dd MM yyyy',
                  )}
                  style={[styles.marginV]}
                />
                <QuickInfo
                  name="Next Airing Episode"
                  value={data.Media.nextAiringEpisode.episode}
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
                uri: `https://www.youtube.com/embed/${data.Media.trailer.id}`,
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