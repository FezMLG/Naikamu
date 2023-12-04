import React from 'react';

import { AnimeDetails } from '@naikamu/shared';
import { format } from 'date-fns';
import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTranslate } from '../../i18n/useTranslate';
import { colors, darkStyle, fontStyles, globalStyle } from '../../styles';
import { ProgressiveImage } from '../atoms';

import { QuickInfo } from './QuickInfo';

function Title({
  romaji,
  english,
  styles = {},
}: {
  romaji?: string;
  english?: string;
  styles?: TextStyle;
}) {
  return (
    <Text style={[colors.textLight, fontStyles.screenHeader, styles]}>
      {romaji ?? english}
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
    <View
      style={{
        flex: 1,
        position: 'absolute',
        right: 0,
        width: '100%',
        height: 300,
        zIndex: -1,
      }}>
      <ProgressiveImage
        resizeMode="cover"
        source={props.bannerImage ?? props.altImage}
        style={{
          zIndex: 1,
          width: '100%',
          height: '100%',
        }}
      />
      <View
        style={{
          zIndex: 5,
          backgroundColor: 'rgba(0,0,0,0.6)',
          width: '60%',
          height: '100%',
          position: 'absolute',
        }}
      />
    </View>
  );
}

function QuickInfoContainer({ data }: { data: AnimeDetails }) {
  const { translate } = useTranslate();

  return (
    <View style={[styles.quickInfoContainer]}>
      <QuickInfo
        value={translate('anime_details.status_list.' + data.status)}
      />
      <QuickInfo
        prefix={`${translate('animeSeason.' + data.season)} `}
        value={`${data.seasonYear}`}
      />
      <QuickInfo value={data.format} />
      <QuickInfo suffix=" episodes" value={data.episodes} />
      <QuickInfo isLast suffix=" mins" value={data.duration} />
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
    <Text style={[darkStyle.font, fontStyles.text]}>
      {props.description.replaceAll(/<[^>]*>?/gm, '')}
    </Text>
  );
}

function AverageScore(props: { averageScore?: number }) {
  return (
    <Text style={[darkStyle.font, fontStyles.text]}>
      Average score: {props.averageScore}
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
    <View>
      <Text
        style={[
          globalStyle.disclaimer,
          darkStyle.font,
          colors.textLighter,
          fontStyles.label,
        ]}>
        {translate('anime_details.source')}: AniList ({sourceId})
      </Text>
    </View>
  );
}

export const SeriesDetails = {
  Poster,
  Title,
  SubTitle,
  NextEpisode,
  QuickInfoContainer,
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
    position: 'absolute',
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
