import { NativeScrollEvent } from 'react-native';
import {
  Easing,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const useAnimatedHeader = (
  headerHeight: number,
  onScrollCallback?: (event: NativeScrollEvent) => void,
) => {
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const translateY = useSharedValue(0);
  const underHeight = useSharedValue<number>(headerHeight);

  const animatedTransform = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(translateY.value, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        }),
      },
    ],
  }));

  const animatedHeight = useAnimatedStyle(() => ({
    height: withTiming(underHeight.value, {
      duration: 60,
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

      if (onScrollCallback) {
        runOnJS(onScrollCallback)(event);
      }
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
