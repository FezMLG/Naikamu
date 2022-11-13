import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslate } from '../../i18n/useTranslate';
import { Relation } from '../../interfaces';
import { darkColor } from '../../styles/darkMode.style';
import { ProgressiveImage } from '../ProgressiveImage';

export const AnimeRelation = ({
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
          <Text variant="bodySmall" style={[styles.textCapitalize]}>
            {translate('anime_details.relations_list.' + relation.relationType)}
          </Text>
          <Text variant="titleMedium" style={styles.title} numberOfLines={3}>
            {relation.title.romaji}
          </Text>
        </View>
        <View style={[styles.flexRow, styles.marginBottom]}>
          <Text variant="bodyMedium" style={styles.textCapitalize}>
            {relation.format}
          </Text>
          <Text> · </Text>
          <Text variant="bodyMedium" style={styles.textCapitalize}>
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
    height: 115,
    backgroundColor: darkColor.C800,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: 10,
    marginLeft: 20,
  },
  title: {
    width: 185,
  },
  poster: {
    maxHeight: 115,
    width: 90,
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
  flexRow: {
    flexDirection: 'row',
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
