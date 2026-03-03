import {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { FILTER_HEADER_CONFIG } from '../../../constants';

export const useAnimatedHeader = (headerHeight: number) => {
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const translateY = useSharedValue(0);
  const underHeight = useSharedValue<number>(headerHeight / 2);

  const animatedTransform = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(translateY.value, {
          duration: FILTER_HEADER_CONFIG.ANIMATION.TRANSFORM_DURATION,
          easing: Easing.inOut(Easing.ease),
        }),
      },
    ],
  }));

  const animatedHeight = useAnimatedStyle(() => ({
    height: withTiming(underHeight.value, {
      duration: FILTER_HEADER_CONFIG.ANIMATION.HEIGHT_DURATION,
      easing: Easing.inOut(Easing.ease),
    }),
  }));

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      if (event.contentOffset.y < headerHeight / 2) {
        underHeight.value = headerHeight / 2 - event.contentOffset.y;
      } else if (
        lastContentOffset.value > event.contentOffset.y &&
        isScrolling.value
      ) {
        translateY.value = 0;
      } else if (
        lastContentOffset.value < event.contentOffset.y &&
        isScrolling.value
      ) {
        translateY.value = -headerHeight;
      }
      lastContentOffset.value = event.contentOffset.y;
    },
    onBeginDrag: () => {
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    },
  });

  return {
    animatedTransform,
    animatedHeight,
    scrollHandler,
  };
};
