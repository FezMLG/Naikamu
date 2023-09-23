import React from 'react';

import { Relation } from '@aniwatch/shared';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useTranslate } from '../../i18n/useTranslate';
import { colors, fontStyles, DarkColor } from '../../styles';
import { ProgressiveImage } from '../ProgressiveImage';
import { Dot } from '../atoms';

export function SeriesRelations({
  relation,
  handleNavigation,
}: {
  relation: Relation;
  handleNavigation: ((event: GestureResponderEvent) => void) | null | undefined;
}) {
  const { translate } = useTranslate();

  return (
    <Pressable onPress={handleNavigation} style={[styles.container]}>
      <ProgressiveImage
        source={relation.coverImage.medium}
        style={[styles.poster]}
      />
      <View style={styles.details}>
        <View style={[styles.flexColumn, styles.marginTop]}>
          <Text
            style={[styles.textCapitalize, fontStyles.label, colors.textLight]}>
            {translate('anime_details.relations_list.' + relation.relationType)}
          </Text>
          <Text numberOfLines={4} style={[styles.title, colors.textLight]}>
            {relation.title.romaji}
          </Text>
        </View>
        <View style={[styles.type, styles.marginBottom]}>
          <Text style={[styles.uppercase, fontStyles.label, colors.textLight]}>
            {relation.format}
          </Text>
          <Dot />
          <Text style={[styles.uppercase, fontStyles.label, colors.textLight]}>
            {relation.status}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    maxWidth: 300,
    height: 150,
    backgroundColor: DarkColor.C800,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: 10,
    marginRight: 20,
  },
  title: {
    ...fontStyles.text,
    fontFamily: 'Roboto-Bold',
    width: 185,
  },
  poster: {
    height: '100%',
    width: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    resizeMode: 'cover',
  },
  details: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  flexColumn: {
    flexDirection: 'column',
  },
  type: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  marginTop: {
    marginLeft: 10,
    marginTop: 5,
  },
  marginBottom: {
    marginLeft: 10,
    marginBottom: 5,
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
});
