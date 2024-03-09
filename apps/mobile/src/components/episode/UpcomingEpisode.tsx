import React from 'react';

import { BlurView } from '@react-native-community/blur';
import { format } from 'date-fns';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

import { useTranslate } from '../../i18n/useTranslate';
import { useActiveSeriesStore } from '../../services';
import {
  colors,
  DarkColor,
  defaultRadius,
  fontStyles,
  globalStyle,
} from '../../styles';
import { PlatformExplicit } from '../PlatformExplicit';
import { ProgressiveImage } from '../ProgressiveImage';

import { EpisodeImage } from './player';

export function UpcomingEpisode() {
  const { translate } = useTranslate();
  const { nextAiringEpisode, posterUrl } = useActiveSeriesStore(
    store => store.series,
  )!;

  return (
    <SafeAreaView style={[styles.episodeContainer]}>
      <View style={[styles.cardContainer]}>
        <PlatformExplicit availablePlatforms={['ios']}>
          <ProgressiveImage
            key="blurryImage"
            source={posterUrl}
            style={[
              StyleSheet.absoluteFill,
              {
                borderRadius: defaultRadius - 1,
              },
            ]}
          />
          <BlurView
            blurAmount={25}
            blurType="dark"
            reducedTransparencyFallbackColor={DarkColor.C900}
            style={[
              StyleSheet.absoluteFill,
              {
                borderRadius: defaultRadius - 1,
              },
            ]}
          />
        </PlatformExplicit>
        <View style={[styles.innerCard]}>
          <EpisodeImage isUpcoming source={posterUrl} />
          <TitleContainer>
            <Text style={[styles.title, colors.textLight]}>
              {nextAiringEpisode?.episode +
                '. Episode ' +
                nextAiringEpisode?.episode}
            </Text>
            <Text
              style={[
                fontStyles.label,
                colors.textLighter,
                globalStyle.marginTopSmall,
              ]}>
              {translate('anime_episodes.upcoming')}
            </Text>
            {nextAiringEpisode?.airingAt ? (
              <>
                <Text style={[fontStyles.normal, colors.textLight]}>
                  {format(
                    new Date(nextAiringEpisode.airingAt * 1000),
                    'dd/MM H:mm',
                  )}
                </Text>
              </>
            ) : null}
          </TitleContainer>
        </View>
      </View>
    </SafeAreaView>
  );
}

const TitleContainer = styled.View`
  width: 55%;
  padding-vertical: 5px;
  padding-horizontal: 10px;
  flex-direction: column;
`;

const styles = StyleSheet.create({
  episodeContainer: {
    marginVertical: 16,
    width: '100%',
    maxWidth: 500,
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
  innerCard: {
    width: '100%',
    flexDirection: 'row',
  },
  cardContainer: {
    borderTopLeftRadius: defaultRadius,
    borderTopRightRadius: defaultRadius,
    width: '100%',
  },
});
