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

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(translateY.value, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        }),
      },
    ],
  }));

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      if (
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
    animatedStyle,
    scrollHandler,
  };
};
