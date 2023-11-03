import React, { useState } from 'react';

import { IWatchListSeries } from '@naikamu/shared';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// import { useTranslate } from '../../i18n/useTranslate';
import { darkStyle, defaultRadius } from '../../styles';
import { ProgressiveImage } from '../atoms';
import { useSelectedSeriesStore } from '../../services';

export function WatchListElement({
  anime, // handlePageChange,
}: {
  anime: IWatchListSeries;
  // handlePageChange: ((event: GestureResponderEvent) => void) | null | undefined;
}) {
  const [isFocus, setIsFocus] = useState(false);
  const [textHeight, setTextHeight] = useState(140);
  const selectedSeriesService = useSelectedSeriesStore(state => state.actions);
  // const { translate } = useTranslate();

  return (
    <TouchableOpacity
      key={anime.id}
      onBlur={() => setIsFocus(previous => !previous)}
      onFocus={() => {
        setIsFocus(previous => !previous);
        selectedSeriesService.setSeries(anime);
      }}
      // onPress={handlePageChange}
      style={[
        styles.container,
        isFocus ? { borderColor: '#FF0000' } : { borderColor: 'transparent' },
      ]}>
      <View style={[styles.poster, { backgroundColor: '#000000' }]}>
        <ProgressiveImage source={anime.poster} style={styles.poster} />
      </View>
      <View
        onLayout={event => setTextHeight(event.nativeEvent.layout.height)}
        style={[styles.titleContainer, { bottom: textHeight }]}>
        <Text numberOfLines={4} style={[darkStyle.font, styles.title]}>
          {anime.title}
        </Text>
        {/*<Text*/}
        {/*  numberOfLines={1}*/}
        {/*  style={[{ color: '#FFFFFF' }, styles.subTitle]}>*/}
        {/*  {anime.studios[0]?.name ?? ''}*/}
        {/*</Text>*/}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: 250,
    maxWidth: 175,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: defaultRadius,
    resizeMode: 'cover',
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
  subTitle: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
  },
  titleContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: 'relative',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderBottomStartRadius: defaultRadius,
    borderBottomEndRadius: defaultRadius,
  },
});
