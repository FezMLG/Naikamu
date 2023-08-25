import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Linking, ScrollView, StyleSheet, Text } from 'react-native';
import { AnimeDetails } from '@aniwatch/shared';
import { useTranslate } from '../../i18n/useTranslate';
import {
  RootStackParamList,
  SeriesStackParamList,
  SeriesStackScreenNames,
} from '../../routes';
import { darkStyle } from '../../styles';
import { SeriesRelations } from './SeriesRelations';

export const SeriesDetailsRelations = (props: {
  relations: AnimeDetails['relations'];
}) => {
  const { translate } = useTranslate();
  const navigation = useNavigation<NavigationProp<SeriesStackParamList>>();

  return (
    <>
      <Text style={[styles.titleType, darkStyle.font]}>
        {translate('anime_details.relations')}
      </Text>
      <ScrollView horizontal={true}>
        {props.relations.map((relation, index) => {
          return (
            <SeriesRelations
              key={index}
              relation={relation}
              handleNavigation={() => {
                switch (relation.type.toLocaleLowerCase()) {
                  case 'anime':
                    navigation.navigate(SeriesStackScreenNames.Series, {
                      id: relation.id,
                      title: relation.title.romaji,
                    });
                    break;
                  default:
                    Linking.openURL(
                      'https://anilist.co/' +
                        relation.type.toLowerCase() +
                        '/' +
                        relation.id,
                    );
                }
              }}
            />
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  titleType: {
    fontFamily: 'Lato-Bold',
    fontSize: 24,
  },
});
