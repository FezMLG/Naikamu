import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslate } from '../../i18n/useTranslate';
import { Relation } from '@aniwatch/shared';
import { darkColor } from '../../styles/darkMode.style';
import { ProgressiveImage } from '../ProgressiveImage';
import { colors, fontStyles } from '../../styles';

export const SeriesRelations = ({
  relation,
  handleNavigation,
}: {
  relation: Relation;
  handleNavigation: ((event: GestureResponderEvent) => void) | null | undefined;
}) => {
  const { translate } = useTranslate();

  return (
    <Pressable style={[styles.container]} onPress={handleNavigation}>
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
          <Text style={[styles.title, colors.textLight]} numberOfLines={4}>
            {relation.title.romaji}
          </Text>
        </View>
        <View style={[styles.type, styles.marginBottom]}>
          <Text
            style={[styles.textCapitalize, fontStyles.label, colors.textLight]}>
            {relation.format}
          </Text>
          <Text>•</Text>
          <Text
            style={[styles.textCapitalize, fontStyles.label, colors.textLight]}>
            {relation.status}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    maxWidth: 300,
    height: 150,
    backgroundColor: darkColor.C800,
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
});
