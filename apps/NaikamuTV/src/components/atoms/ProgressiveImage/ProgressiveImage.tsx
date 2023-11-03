import React from 'react';

import { Animated } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';

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
      }}
      {...props}
    />
  );
}
