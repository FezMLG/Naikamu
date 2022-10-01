import React from 'react';
import {
  Animated,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';

export const ProgressiveImage = (props: {
  source: ImageSourcePropType;
  style: StyleProp<ImageStyle>[];
}) => {
  const imageAnimated = new Animated.Value(0);

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  const { source, style } = props;

  return (
    <Animated.Image
      {...props}
      source={source}
      style={[{ opacity: imageAnimated }, ...style]}
      onLoad={onImageLoad}
    />
  );
};
