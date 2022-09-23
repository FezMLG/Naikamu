import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { RoutesNames } from '../routes/RoutesNames.enum';
import { useQuery } from '@tanstack/react-query';
import { getTitle } from '../api/rest/frixy/getTitle';
import { darkStyle } from '../styles/darkMode.style';

export interface Episode {
  id: string;
  title: string;
  description: string;
  number: number;
  banner: string;
  players: LinkElement[];
  added_at: string;
  last_edit: string;
  poster: string;
}

export interface LinkElement {
  name: string;
  link: string;
}

const EpisodesListPage = ({ navigation, route }: any) => {
  const { isLoading, data } = useQuery([route.params.title], () =>
    getTitle(route.params.title),
  );

  return (
    <SafeAreaView style={[styles.container, darkStyle.background]}>
      <ScrollView style={styles.scrollView}>
        {isLoading && <ActivityIndicator size="large" />}
        {data &&
          data.episodes.map((episode: Episode) => {
            return (
              <View key={episode.id} style={[styles.card, darkStyle.card]}>
                <Image style={styles.poster} source={{ uri: episode.poster }} />
                <Text numberOfLines={2} style={[styles.title, darkStyle.font]}>
                  {episode.title}
                </Text>
                {episode.players.map((player: LinkElement, index: number) => {
                  return (
                    <Pressable
                      key={index}
                      style={styles.buttonLink}
                      onPress={() => {
                        navigation.navigate(RoutesNames.Watch, {
                          uri: player.link,
                          title: episode.title,
                          player: player.name,
                        });
                      }}>
                      <Text style={[styles.title, darkStyle.font]}>
                        {player.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  poster: {
    width: 200,
    height: 300,
  },
  title: {
    width: 200,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  card: {
    minHeight: 350,
    width: 200,
    marginVertical: 10,
  },
  buttonLink: {
    minHeight: 50,
    borderColor: 'blue',
    borderWidth: 1,
  },
});

export default EpisodesListPage;
