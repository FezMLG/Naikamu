import React from 'react';

import { AnimeDetails } from '@naikamu/shared';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Linking, ScrollView, StyleSheet, Text } from 'react-native';

import { useTranslate } from '../../i18n/useTranslate';
import {
  SeriesStackParameterList as SeriesStackParameterList,
  SeriesStackScreenNames,
} from '../../routes';
import { darkStyle } from '../../styles';

import { SeriesRelations } from './SeriesRelations';

export function SeriesDetailsRelations(props: {
  relations: AnimeDetails['relations'];
}) {
  const { translate } = useTranslate();
  const navigation = useNavigation<NavigationProp<SeriesStackParameterList>>();

  const sortedRelations = [...props.relations].sort((a, b) => {
    const aIsAnime = a.type.toLowerCase() === 'anime';
    const bIsAnime = b.type.toLowerCase() === 'anime';

    if (aIsAnime && !bIsAnime) return -1;
    if (!aIsAnime && bIsAnime) return 1;

    return 0;
  });

  return (
    <>
      <Text style={[styles.titleType, darkStyle.font]}>
        {translate('anime_details.relations')}
      </Text>
      <ScrollView horizontal={true}>
        {sortedRelations.map((relation, index) => {
          const isExternal = relation.type.toLowerCase() !== 'anime';

          return (
            <SeriesRelations
              handleNavigation={() => {
                if (isExternal) {
                  Linking.openURL(
                    'https://anilist.co/' +
                      relation.type.toLowerCase() +
                      '/' +
                      relation.id,
                  ).catch(() => {});
                } else {
                  navigation.navigate(SeriesStackScreenNames.Series, {
                    id: relation.id,
                    title: relation.title.romaji,
                  });
                }
              }}
              isExternal={isExternal}
              key={index}
              relation={relation}
            />
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleType: {
    fontFamily: 'Lato-Bold',
    fontSize: 24,
  },
});
