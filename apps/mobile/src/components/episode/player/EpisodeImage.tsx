import React from 'react';

import { StyleSheet } from 'react-native';

import { defaultRadius } from '../../../styles';
import { PlatformExplicit } from '../../PlatformExplicit';
import { ProgressiveImage } from '../../ProgressiveImage';

export const EpisodeImage = ({ source }: { source: string }) => (
  <>
    <PlatformExplicit availablePlatforms={['ios']}>
      <ProgressiveImage source={source} style={[styles.poster]} />
    </PlatformExplicit>
    <PlatformExplicit availablePlatforms={['android']}>
      <ProgressiveImage
        source={source}
        style={[styles.poster, { borderRadius: defaultRadius }]}
      />
    </PlatformExplicit>
  </>
);

const styles = StyleSheet.create({
  poster: {
    width: '30%',
    height: 80,
    borderTopLeftRadius: defaultRadius,
    borderBottomLeftRadius: defaultRadius,
  },
});
