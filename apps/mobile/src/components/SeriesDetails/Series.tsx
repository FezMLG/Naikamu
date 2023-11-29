import React from 'react';

import { AnimeDetails } from '@naikamu/shared';
import { format } from 'date-fns';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTranslate } from '../../i18n/useTranslate';
import { colors, fontStyles, globalStyle } from '../../styles';
import { Dot } from '../atoms';
import { ProgressiveImage } from '../ProgressiveImage';

import { QuickInfo } from './QuickInfo';

function Title(props: { romaji?: string; english?: string }) {
  return (
    <Text selectable={true} style={[colors.textLight, styles.title]}>
      {props.romaji ?? props.english}
    </Text>
  );
}

function SubTitle(props: { romaji?: string; english?: string }) {
  return (
    <>
      {props.romaji !== props.english && (
        <Text selectable={true} style={[colors.textLighter, styles.subTitle]}>
          {props.english}
        </Text>
      )}
    </>
  );
}

function Poster(props: { bannerImage?: string; altImage: string }) {
  return (
    <ProgressiveImage
      source={props.bannerImage ?? props.altImage}
      style={styles.banner}
    />
  );
}

function QuickInfoContainer({ data }: { data: AnimeDetails }) {
  const { translate } = useTranslate();

  return (
    <View style={[styles.quickInfoContainer]}>
      <QuickInfo
        value={translate('anime_details.status_list.' + data.status)}
      />
      <Dot />
      <QuickInfo
        value={`${translate('animeSeason.' + data.season)} ${data.seasonYear}`}
      />
      <Dot />
      <QuickInfo value={data.format} />
      <Dot />
      <QuickInfo value={data.episodes} />
      <Dot />
      <QuickInfo value={`${data.duration} mins`} />
    </View>
  );
}

function NextEpisode(props: { episode?: number; airingAt?: number }) {
  const { translate } = useTranslate();

  return (
    <>
      {props.airingAt ? (
        <>
          <Text style={[fontStyles.label, colors.accent]}>
            {translate('anime_details.next_episode')}
          </Text>
          <Text style={[styles.nextEpisode, colors.accent]}>
            Ep {props.episode}:{' '}
            {format(new Date(props.airingAt ?? 0 * 1000), 'dd/MM H:mm')}
          </Text>
        </>
      ) : null}
    </>
  );
}

function Genres(props: { genres: AnimeDetails['genres']; color?: string }) {
  const color = props.color ?? colors.accent.color;
  const textColor = pickTextColorBasedOnBgColorAdvanced(
    color,
    colors.textLight.color,
    colors.textDark.color,
  );

  return (
    <View style={[styles.chipContainer]}>
      {props.genres.map((genre, index) => (
        <View
          key={index}
          style={[styles.chipGenre, { backgroundColor: color }]}>
          <Text style={{ color: textColor }}>{genre}</Text>
        </View>
      ))}
    </View>
  );
}

function Description(props: { description: string }) {
  return (
    <Text style={[colors.textLight, fontStyles.paragraph]}>
      {props.description.replaceAll(/<[^>]*>?/gm, '')}
    </Text>
  );
}

function AverageScore(props: { averageScore?: number }) {
  const { translate } = useTranslate();

  return (
    <Text style={[colors.textLight, fontStyles.normal]}>
      {translate('anime_details.averageScore')}: {props.averageScore}
      <Text style={[colors.textLighter, fontStyles.normal]}> / 100</Text>
    </Text>
  );
}

function Trailer(props: { trailer: AnimeDetails['trailer'] }) {
  const { translate } = useTranslate();
  const { trailer } = props;

  return (
    <>
      {trailer ? (
        <View style={styles.trailerContainer}>
          <Pressable
            onPress={() =>
              Linking.openURL('https://www.youtube.com/watch?v=' + trailer.id)
            }
            style={styles.trailerButton}>
            <Icon color="white" name="movie-play-outline" size={30} />
            <Text style={[fontStyles.normal, colors.textLight]}>
              {translate('anime_details.trailer')}
            </Text>
          </Pressable>
        </View>
      ) : null}
    </>
  );
}

function DataSource({ sourceId }: { sourceId: AnimeDetails['sourceId'] }) {
  const { translate } = useTranslate();

  return (
    <Pressable
      onPress={() => Linking.openURL('https://anilist.co/anime/' + sourceId)}>
      <Text style={[globalStyle.disclaimer, colors.textLight]}>
        {translate('anime_details.source')}: AniList{' '}
        <Icon color="white" name="open-in-new" size={16} />
      </Text>
    </Pressable>
  );
}

export const SeriesDetails = {
  Poster,
  Title,
  SubTitle,
  QuickInfoContainer,
  NextEpisode,
  Description,
  AverageScore,
  Genres,
  Trailer,
  DataSource,
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
    height: 300,
    resizeMode: 'contain',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chipGenre: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  titleType: {
    fontWeight: 'bold',
  },
  quickInfoContainer: {
    flexDirection: 'row',
    marginRight: 10,
    width: '100%',
    alignItems: 'flex-start',
    gap: 5,
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
  title: {
    paddingTop: 30,
    fontFamily: 'Catamaran-Black',
    fontSize: 28,
    lineHeight: 30,
  },
  subTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
  },
  nextEpisode: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  trailerContainer: {
    height: 60,
    width: '25%',
  },
  trailerButton: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 5,
  },
});

function pickTextColorBasedOnBgColorAdvanced(
  bgColor: string,
  lightColor: string,
  darkColor: string,
) {
  const color = bgColor.charAt(0) === '#' ? bgColor.slice(1, 7) : bgColor;
  const r = Number.parseInt(color.slice(0, 2), 16); // hexToR
  const g = Number.parseInt(color.slice(2, 4), 16); // hexToG
  const b = Number.parseInt(color.slice(4, 6), 16); // hexToB
  const uiColors = [r / 255, g / 255, b / 255];
  const c = uiColors.map(col => {
    if (col <= 0.039_28) {
      return col / 12.92;
    }

    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];

  return L > 0.179 ? darkColor : lightColor;
}
