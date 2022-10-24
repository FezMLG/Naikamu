import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { RoutesNames, SearchPageProps } from '../../routes/interfaces';

const SearchPage = ({ navigation }: SearchPageProps) => {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={[styles.container]}>
      <TextInput
        label="Search"
        mode="outlined"
        value={search}
        onChangeText={text => setSearch(text)}
      />
      <Button
        mode={'contained'}
        onPress={() =>
          navigation.navigate(RoutesNames.SearchResults, {
            phrase: search,
          })
        }>
        Search
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SearchPage;
