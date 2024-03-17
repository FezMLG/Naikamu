import React, { useState } from 'react';

import { format } from 'date-fns';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTranslate } from '../../i18n/useTranslate';
import { useSelectedSeriesStore } from '../../services';
import {
  colors,
  DarkColor,
  defaultRadius,
  fontStyles,
  globalStyle,
} from '../../styles';
import { Selectable } from '../atoms';

import { EpisodeImage } from './EpisodeImage';

export function UpcomingEpisode() {
  const series = useSelectedSeriesStore(store => store.details)!;
  const nextAiringEpisode = series.nextAiringEpisode!;

  const [isSelected, setIsSelected] = useState(false);

  const { translate } = useTranslate();

  const openDetails = () => {
    setIsSelected(previous => !previous);
  };

  return (
    <View style={[styles.episodeContainer]}>
      <Selectable customStyles={[styles.mainContainer]} onPress={openDetails}>
        <EpisodeImage isUpcoming source={series.coverImage.extraLarge} />
        <View style={styles.detailsContainer}>
          <Text
            numberOfLines={2}
            style={[fontStyles.headerSmall, colors.textLight]}>
            {nextAiringEpisode.episode +
              '. Episode ' +
              nextAiringEpisode.episode}
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
          <Icon
            color={colors.textLight.color}
            name={isSelected ? 'chevron-down' : 'chevron-up'}
            size={fontStyles.header.fontSize}
            style={{
              alignSelf: 'flex-end',
            }}
          />
        </View>
      </Selectable>
    </View>
  );
}

const styles = StyleSheet.create({
  episodeContainer: {
    marginVertical: 16,
    width: '100%',
    maxWidth: 550,
  },
  mainContainer: {
    width: '100%',
    height: 150,
    flex: 1,
    borderColor: DarkColor.C700,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: defaultRadius,
    flexDirection: 'row',
  },
  detailsContainer: {
    width: '60%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'column',
  },
  playersListContainer: {
    width: '100%',
    marginTop: 20,
    gap: 10,
  },
});
