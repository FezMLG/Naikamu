import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Linking,
} from 'react-native';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import {
  ActivityIndicator,
  Button,
  Chip,
  Modal,
  Portal,
  Text,
} from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';
import LinearGradient from 'react-native-linear-gradient';

import { darkStyle } from '../../styles/darkMode.style';
import { globalStyle } from '../../styles/global.style';
import { TVButton } from '../../components/TVButton';
import { AnimeDetails } from '@aniwatch/shared';
import { APIClient } from '../../api/APIClient';
import { ProgressiveImage } from '../../components/ProgressiveImage';
import { QuickInfo } from '../../components/series/QuickInfo';
import { AnimeRelation } from '../../components/series/Relation';
import { useTranslate } from '../../i18n/useTranslate';
import { SeriesScreenProps, ScreenNames } from '../../routes/main';
import { CombinedDarkTheme } from '../../App';

const SeriesScreen = ({ navigation, route }: SeriesScreenProps) => {
  const apiClient = new APIClient();
  const acceptedLinks = [
    'Netflix',
    'Hulu',
    'Disney Plus',
    'Crunchyroll',
    'YouTube',
  ];
  const { title, id } = route.params;
  const { translate } = useTranslate();
  const [textWidth, setTextWidth] = useState(0);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const { data } = useQuery<AnimeDetails>(['anime', title, 'details'], () =>
    apiClient.getAnimeDetails(id),
  );

  return (
    <SafeAreaView style={[styles.container]}>
      {data ? (
        <ScrollView style={styles.scrollView}>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.modal}>
              <Text
                variant="bodyMedium"
                style={[
                  darkStyle.font,
                  globalStyle.spacerSmall,
                  styles.description,
                ]}>
                {data.description.replace(/<[^>]*>?/gm, '')}
              </Text>
              <Button onPress={hideModal} focusable={visible}>
                Press back on remote to close
              </Button>
            </Modal>
          </Portal>
          <View style={styles.topContainer}>
            <ProgressiveImage
              style={[styles.banner]}
              source={data.coverImage.extraLarge}
            />
            <LinearGradient
              colors={['transparent', CombinedDarkTheme.colors.background]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              locations={[0, 0.45]}
              style={styles.linearGradient}
            />
            <View style={styles.leftContainer}>
              <View style={[styles.categorySpacer]} />
              <Text
                variant="headlineLarge"
                style={darkStyle.font}
                accessible={false}>
                {data.title.romaji ?? data.title.english}
              </Text>
              {data.title.romaji !== data.title.english && (
                <Text
                  variant="titleSmall"
                  style={darkStyle.font}
                  accessible={false}>
                  {data.title.english}
                </Text>
              )}
              <View>
                <Text
                  accessible={false}
                  variant="bodyMedium"
                  numberOfLines={10}
                  style={[
                    darkStyle.font,
                    globalStyle.spacerSmall,
                    styles.description,
                  ]}>
                  {data.description.replace(/<[^>]*>?/gm, '')}
                </Text>
                <View
                  style={{ height: 0, alignSelf: 'flex-start' }}
                  onLayout={e => {
                    setTextWidth(e.nativeEvent.layout.width);
                  }}>
                  <Text>{data.description.replace(/<[^>]*>?/gm, '')}</Text>
                </View>
                <Button onPress={showModal}>
                  {textWidth > 300 ? 'Show more' : null}
                </Button>
              </View>
              <View style={[globalStyle.spacer]} />
              <TVButton
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
              </TVButton>
              <View style={[styles.quickInfoContainer, styles.categorySpacer]}>
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
                  />
                )}
                <QuickInfo
                  name={translate('anime_details.format')}
                  value={data.format}
                  styleView={[globalStyle.marginBottomSmall]}
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
                  name={`${data.dataSource} ${translate(
                    'anime_details.score',
                  )}`}
                  value={`${data.averageScore} / 100`}
                />
                <QuickInfo
                  name={translate('anime_details.season')}
                  value={`${translate('animeSeason.' + data.season)} ${
                    data.seasonYear
                  }`}
                  styleText={[styles.textCapitalize]}
                />
              </View>
            </View>
          </View>
          <View style={styles.bottomContainer}>
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
                  width={500}
                  videoId={data.trailer?.id}
                  webViewStyle={styles.marginV}
                />
              </>
            )}
            <Text style={[styles.titleType, darkStyle.font]}>
              {translate('anime_details.links')}
            </Text>
            <View style={styles.linksContainer}>
              {data.externalLinks
                .filter(item => acceptedLinks.includes(item.site))
                .map((link, index) => {
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
  modal: {
    backgroundColor: darkStyle.background.backgroundColor,
    margin: 20,
    padding: 20,
  },
  scrollView: {},
  body: {},
  leftContainer: {
    width: '40%',
    marginLeft: 20,
  },
  bottomContainer: {
    marginHorizontal: 20,
  },
  banner: {
    width: '70%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  topContainer: {},
  linearGradient: {
    position: 'absolute',
    width: '60%',
    height: '100%',
  },
  description: {},
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
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  linksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
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
