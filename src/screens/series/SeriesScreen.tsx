import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Linking,
} from 'react-native';
import React from 'react';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Button, Chip, Text } from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';

import { darkColor, darkStyle } from '../../styles/darkMode.style';
import { defaultRadius, globalStyle } from '../../styles/global.style';
import { FocusButton } from '../../components/FocusButton';
import { AnimeDetails } from '../../interfaces';
import { APIClient } from '../../api/APIClient';
import { ProgressiveImage } from '../../components/ProgressiveImage';
import { QuickInfo } from '../../components/series/QuickInfo';
import { AnimeRelation } from '../../components/series/Relation';
import { useTranslate } from '../../i18n/useTranslate';
import { SeriesPageProps, ScreenNames } from '../../routes/main';

const SeriesScreen = ({ navigation, route }: SeriesPageProps) => {
  const apiClient = new APIClient();
  const { title, id } = route.params;
  const { translate } = useTranslate();
  const { data } = useQuery<AnimeDetails>(['anime', title, 'details'], () =>
    apiClient.getAnimeDetails(id),
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
            <View style={[styles.categorySpacer]} />
            <Text variant="headlineLarge" style={darkStyle.font}>
              {data.title.romaji ?? data.title.english}
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
                navigation.navigate(ScreenNames.Episodes, {
                  title: data.title.romaji,
                  numOfAiredEpisodes: data.nextAiringEpisode?.episode
                    ? data.nextAiringEpisode?.episode - 1
                    : data.episodes,
                  posterUrl: data.coverImage.extraLarge,
                });
              }}
              style={[]}>
              {translate('anime_details.see_episodes')}
            </FocusButton>
            <ScrollView
              horizontal={true}
              style={[styles.quickInfoScroll, styles.categorySpacer]}>
              {data.nextAiringEpisode && (
                <QuickInfo
                  name={translate('anime_details.next_episode')}
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
                name={translate('anime_details.format')}
                value={data.format}
                styleView={[!data.nextAiringEpisode && styles.paddingLeft]}
              />
              <QuickInfo
                name={translate('anime_details.episodes')}
                value={data.episodes ?? '?'}
              />
              <QuickInfo
                name={translate('anime_details.duration')}
                value={`${data.duration} mins`}
              />
              <QuickInfo
                name={translate('anime_details.status')}
                value={translate('anime_details.status_list.' + data.status)}
                styleText={[styles.textCapitalize]}
              />
              <QuickInfo
                name={`${data.dataSource} ${translate('anime_details.score')}`}
                value={`${data.averageScore} / 100`}
              />
              <QuickInfo
                name={translate('anime_details.season')}
                value={`${translate('animeSeason.' + data.season)} ${
                  data.seasonYear
                }`}
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
            <View style={styles.categorySpacer}>
              <Text style={[styles.titleType, darkStyle.font]}>
                {translate('anime_details.relations')}
              </Text>
              <ScrollView horizontal={true}>
                {data.relations.map((relation, index) => {
                  return (
                    <AnimeRelation
                      key={index}
                      relation={relation}
                      handleNavigation={() => {
                        if (relation.format !== 'ANIME') {
                          navigation.navigate(ScreenNames.Series, {
                            id: relation.id,
                            title: relation.title.romaji,
                          });
                        } else {
                          Linking.openURL(
                            'https://anilist.co/' +
                              relation.type.toLowerCase() +
                              '/' +
                              relation.id,
                          );
                        }
                      }}
                    />
                  );
                })}
              </ScrollView>
            </View>
            {data.trailer && (
              <>
                <Text
                  style={[
                    styles.titleType,
                    styles.categorySpacer,
                    darkStyle.font,
                  ]}>
                  {translate('anime_details.trailer')}
                </Text>
                <YoutubePlayer
                  height={300}
                  videoId={data.trailer?.id}
                  webViewStyle={styles.marginV}
                />
              </>
            )}
            <Text style={[styles.titleType, darkStyle.font]}>
              {translate('anime_details.links')}
            </Text>
            <View style={styles.linksContainer}>
              <View style={styles.linkContainer}>
                <ProgressiveImage
                  source={'https://anilist.co/img/icons/favicon-32x32.png'}
                  style={[styles.icon]}
                />
                <Button
                  mode={'text'}
                  onPress={() =>
                    Linking.openURL('https://anilist.co/anime/' + id)
                  }>
                  AniList
                </Button>
              </View>
              {data.externalLinks.map((link, index) => {
                return (
                  <View style={styles.linkContainer} key={index}>
                    {link.icon ? (
                      <ProgressiveImage
                        source={link.icon}
                        style={[styles.icon]}
                      />
                    ) : (
                      <View style={styles.icon} />
                    )}
                    <Button
                      mode={'text'}
                      onPress={() => Linking.openURL(link.url)}>
                      {link.site} {link.language ? link.language : ''}
                    </Button>
                  </View>
                );
              })}
            </View>
            <Text
              variant="bodySmall"
              style={[globalStyle.disclaimer, darkStyle.font]}>
              ({translate('anime_details.source')}: AniList)
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
  linksContainer: {},
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default SeriesScreen;
