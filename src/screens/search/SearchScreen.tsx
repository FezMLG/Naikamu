import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { SearchScreenProps, ScreenNames } from '../../routes/main';

const SearchScreen = ({ navigation }: SearchScreenProps) => {
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
          navigation.navigate(ScreenNames.SearchResults, {
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

export default SearchScreen;
