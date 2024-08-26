import React from 'react';

import { StyleSheet, View } from 'react-native';

import { defaultRadius } from '../../../styles';
import { ProgressiveImage } from '../../ProgressiveImage';

type SmallPosterProps = {
  source: string;
};

export const SmallPoster: React.FC<SmallPosterProps> = ({ source }) => (
  <View style={[styles.posterContainer]}>
    <ProgressiveImage
      resizeMode="contain"
      source={source}
      style={styles.poster}
    />
  </View>
);

const styles = StyleSheet.create({
  posterContainer: {
    width: '25%',
    height: '100%',
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: defaultRadius,
  },
});
