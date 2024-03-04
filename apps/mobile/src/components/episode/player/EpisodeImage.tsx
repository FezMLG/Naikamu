import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { useTranslate } from '../../../i18n/useTranslate';
import { colors, defaultRadius, fontStyles } from '../../../styles';
import { PlatformExplicit } from '../../PlatformExplicit';
import { ProgressiveImage } from '../../ProgressiveImage';

export const EpisodeImage = ({
  source,
  isWatched,
}: {
  source: string;
  isWatched: boolean;
}) => {
  const { translate } = useTranslate();

  return (
    <>
      {isWatched ? (
        <View
          style={{
            width: '30%',
            height: 80,
            borderRadius: defaultRadius,
            position: 'absolute',
            zIndex: 10,
            opacity: 0.75,
          }}>
          <View
            style={{
              borderRadius: defaultRadius,
              alignSelf: 'flex-start',
              justifyContent: 'flex-start',
              backgroundColor: 'black',
              paddingVertical: 5,
              paddingHorizontal: 10,
            }}>
            <Text style={[fontStyles.label, colors.textLight]}>
              {translate('Watched')}
            </Text>
          </View>
        </View>
      ) : null}
      <PlatformExplicit availablePlatforms={['ios']}>
        <ProgressiveImage
          resizeMode={FastImage.resizeMode.cover}
          source={source}
          style={[styles.poster]}
        />
      </PlatformExplicit>
      <PlatformExplicit availablePlatforms={['android']}>
        <ProgressiveImage
          resizeMode={FastImage.resizeMode.cover}
          source={source}
          style={[styles.poster, { borderRadius: defaultRadius }]}
        />
      </PlatformExplicit>
    </>
  );
};

const styles = StyleSheet.create({
  poster: {
    width: '30%',
    height: 80,
    borderTopLeftRadius: defaultRadius,
    borderBottomLeftRadius: defaultRadius,
  },
});
