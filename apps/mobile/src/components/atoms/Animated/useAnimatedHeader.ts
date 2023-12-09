import { RefObject, useRef } from 'react';

import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

const getCloser = (value: number, checkOne: number, checkTwo: number) =>
  Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

export const useAnimatedHeader = <T = unknown>(
  headerHeight: number,
  listRef: RefObject<FlatList<T>>,
) => {
  const scrollY = useRef(new Animated.Value(0));
  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: scrollY.current },
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );
  const scrollYClamped = Animated.diffClamp(scrollY.current, 0, headerHeight);

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -(headerHeight / 2)],
  });

  const translateYNumber = useRef<number>();

  translateY.addListener(({ value }) => {
    translateYNumber.current = value;
  });

  const handleSnap = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = nativeEvent.contentOffset.y;

    if (
      !(
        translateYNumber.current === 0 ||
        translateYNumber.current === -headerHeight / 2
      ) &&
      listRef.current
    ) {
      listRef.current.scrollToOffset({
        offset:
          getCloser(translateYNumber.current!, -headerHeight / 2, 0) ===
          -headerHeight / 2
            ? offsetY + headerHeight / 2
            : offsetY - headerHeight / 2,
      });
    }
  };

  return {
    handleScroll,
    handleSnap,
    translateY,
  };
};
