import React from 'react';

import { AnimeDetails } from '@aniwatch/shared';
import { id } from 'date-fns/locale';
import { Text, View, Linking, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { useTranslate } from '../../i18n/useTranslate';
import { darkStyle, DarkColor, defaultRadius } from '../../styles';
import { ProgressiveImage } from '../ProgressiveImage';

export function SeriesDetailsLinks(props: {
  externalLinks: AnimeDetails['externalLinks'];
}) {
  const { translate } = useTranslate();

  return (
    <>
      <Text style={[styles.titleType, darkStyle.font]}>
        {translate('anime_details.links')}
      </Text>
      <View style={styles.linksContainer}>
        <View style={styles.linkContainer}>
          <ProgressiveImage
            source="https://anilist.co/img/icons/favicon-32x32.png"
            style={[styles.icon]}
          />
          <Button
            mode="text"
            onPress={() => Linking.openURL('https://anilist.co/anime/' + id)}>
            AniList
          </Button>
        </View>
        {props.externalLinks.map((link, index) => (
          <View key={index} style={styles.linkContainer}>
            {link.icon ? (
              <ProgressiveImage source={link.icon} style={[styles.icon]} />
            ) : (
              <View style={styles.icon} />
            )}
            <Button mode="text" onPress={() => Linking.openURL(link.url)}>
              {link.site} {link.language ?? ''}
            </Button>
          </View>
        ))}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {},
  body: {
    paddingHorizontal: 20,
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipGenre: {
    marginRight: 10,
    marginVertical: 5,
  },
  titleType: {
    fontWeight: 'bold',
  },
  quickInfoContainer: {
    marginRight: 10,
  },
  quickInfoScroll: {
    paddingVertical: 10,
    backgroundColor: DarkColor.C800,
    borderRadius: defaultRadius,
  },
  marginV: {
    marginVertical: 10,
  },
  paddingLeft: {
    paddingLeft: 20,
  },
  categorySpacer: {
    marginTop: 40,
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
  linksContainer: {},
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
