import React from 'react';

import { IWatchListSeries } from '@naikamu/shared';
import {
  StyleSheet,
  View,
  Pressable,
  GestureResponderEvent,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import { useTranslate } from '../../i18n/useTranslate';
import { colors, darkStyle, defaultRadius, fontStyles } from '../../styles';
import { ProgressiveImage } from '../ProgressiveImage';
import { QuickInfo } from '../SeriesDetails';
import { Dot } from '../atoms';

export function WatchListElement({
  anime,
  handlePageChange,
}: {
  anime: IWatchListSeries;
  handlePageChange: ((event: GestureResponderEvent) => void) | null | undefined;
}) {
  // const { translate } = useTranslate();

  return (
    <Pressable
      key={anime.id}
      onPress={handlePageChange}
      style={[styles.container]}>
      <View style={[styles.posterContainer]}>
        <ProgressiveImage
          resizeMode="contain"
          source={anime.poster}
          style={styles.poster}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View
          style={{
            gap: 5,
          }}>
          <Text numberOfLines={4} style={[darkStyle.font, styles.title]}>
            {anime.title}
          </Text>
          <Text style={[darkStyle.font, fontStyles.label]}>
            Watched: {anime.watched.length}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={styles.detailsRow}>
            <QuickInfo value={anime.status} />
            <Dot />
            <QuickInfo value="TV" />
          </View>
          <Pressable>
            <Icon name="dots-vertical" size={24} style={colors.textLight} />
          </Pressable>
        </View>
      </View>
      <View>
        <Icon name="chevron-right" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    height: 100,
    marginVertical: 10,
    maxWidth: 500,
    gap: 10,
  },
  posterContainer: {
    width: '25%',
    height: '100%',
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: defaultRadius,
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    width: '90%',
  },
  subTitle: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
  },
  detailsContainer: {
    width: '75%',
    justifyContent: 'space-between',
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
});
