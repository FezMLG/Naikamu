import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AnimeDetails } from '@aniwatch/shared';

import { colors, darkStyle, fontStyles, globalStyle } from '../../styles';
import { ProgressiveImage } from '../ProgressiveImage';
import { QuickInfo } from './QuickInfo';
import { useTranslate } from '../../i18n/useTranslate';

const Title = (props: { romaji?: string; english?: string }) => {
  return (
    <Text style={[darkStyle.font, styles.title]} selectable={true}>
      {props.romaji ?? props.english}
    </Text>
  );
};

const SubTitle = (props: { romaji?: string; english?: string }) => {
  return (
    <>
      {props.romaji !== props.english && (
        <Text style={[colors.textLighter, styles.subTitle]} selectable={true}>
          {props.english}
        </Text>
      )}
    </>
  );
};

const Poster = (props: { bannerImage?: string; altImage: string }) => {
  return (
    <ProgressiveImage
      source={props.bannerImage ? props.bannerImage : props.altImage}
      style={styles.banner}
    />
  );
};

const QuickInfoContainer = ({ data }: { data: AnimeDetails }) => {
  const { translate } = useTranslate();

  return (
    <View style={[styles.quickInfoContainer]}>
      <QuickInfo
        value={translate('anime_details.status_list.' + data.status)}
      />
      <Text>•</Text>
      <QuickInfo
        value={`${translate('animeSeason.' + data.season)} ${data.seasonYear}`}
      />
      <Text>•</Text>
      <QuickInfo value={data.format} />
      <Text>•</Text>
      <QuickInfo value={data.episodes} />
      <Text>•</Text>
      <QuickInfo value={`${data.duration} mins`} />
    </View>
  );
};

const NextEpisode = (props: { episode?: number; airingAt?: number }) => {
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
};

const Genres = (props: { genres: AnimeDetails['genres']; color: string }) => {
  const textColor = pickTextColorBasedOnBgColorAdvanced(
    props.color,
    colors.textLight.color,
    colors.textDark.color,
  );
  return (
    <View style={[styles.chipContainer]}>
      {props.genres.map((genre, index) => {
        return (
          <View
            key={index}
            style={[styles.chipGenre, { backgroundColor: props.color }]}>
            <Text style={{ color: textColor }}>{genre}</Text>
          </View>
        );
      })}
    </View>
  );
};

const Description = (props: { description: string }) => {
  return (
    <Text style={[darkStyle.font, fontStyles.text]}>
      {props.description.replace(/<[^>]*>?/gm, '')}
    </Text>
  );
};

const Trailer = (props: { trailer: AnimeDetails['trailer'] }) => {
  const { translate } = useTranslate();
  const { trailer } = props;

  return (
    <>
      {trailer ? (
        <View style={styles.trailerContainer}>
          <Pressable
            style={styles.trailerButton}
            onPress={() =>
              Linking.openURL('https://www.youtube.com/watch?v=' + trailer.id)
            }>
            <Icon name={'movie'} size={30} color={'white'} />
            <Text style={[fontStyles.text, colors.textLight]}>
              {translate('anime_details.trailer')}
            </Text>
          </Pressable>
        </View>
      ) : null}
    </>
  );
};

const DataSource = () => {
  const { translate } = useTranslate();

  return (
    <Text style={[globalStyle.disclaimer, darkStyle.font]}>
      {translate('anime_details.source')}: AniList
    </Text>
  );
};

export const SeriesDetails = {
  Poster,
  Title,
  SubTitle,
  QuickInfoContainer,
  NextEpisode,
  Description,
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
    height: 200,
    resizeMode: 'cover',
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
  var color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uiColors = [r / 255, g / 255, b / 255];
  var c = uiColors.map(col => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? darkColor : lightColor;
}
