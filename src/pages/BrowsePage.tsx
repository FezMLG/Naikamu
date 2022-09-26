import { StyleSheet, ActivityIndicator, View, ScrollView } from 'react-native';
import React from 'react';
import { useQuery } from '@apollo/client';
import { LIST_OF_ANIME } from '../api/graphql/anilist/listOfAnime';
import { IALListOfAnime } from '../interfaces';
import { darkStyle } from '../styles/darkMode.style';
import BrowseElement from './BrowseElement';
import { SafeAreaView } from 'react-native-safe-area-context';

const BrowsePage = ({ navigation }: any) => {
  const { loading, data, error } = useQuery<IALListOfAnime>(LIST_OF_ANIME, {
    variables: {
      page: 1,
      perPage: 25,
    },
  });

  // if (loading) return null;
  if (error) {
    console.log(error);
  }

  return (
    <SafeAreaView style={[styles.container, darkStyle.background]}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          <View style={styles.autoGrid}>
            {data &&
              data.Page.media.map(item => {
                return (
                  <BrowseElement
                    key={item.id}
                    anime={item}
                    navigation={navigation}
                  />
                );
              })}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  autoGrid: {
    flexGrow: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
  },
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
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  title: {
    width: 200,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  card: {
    height: 350,
    width: 200,
    marginVertical: 10,
  },
  wrapperFocused: {
    borderColor: 'purple',
    borderWidth: 1,
  },
});

export default BrowsePage;
