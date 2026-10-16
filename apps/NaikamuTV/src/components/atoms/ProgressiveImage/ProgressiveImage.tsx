import React from 'react';

import FastImage, { FastImageProps } from '@d11/react-native-fast-image';
import { Animated } from 'react-native';

export function ProgressiveImage({
  resizeMode,
  source,
  ...props
}: Omit<FastImageProps, 'source'> & { source: string }) {
  const imageAnimated = new Animated.Value(0);

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  return (
    <FastImage
      onLoad={onImageLoad}
      resizeMode={resizeMode ?? FastImage.resizeMode.cover}
      source={{
        uri: source,
        priority: FastImage.priority.normal,
        cache: 'web',
      }}
      {...props}
    />
  );
}
