import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from '../../components';

import { SearchScreenProps, ScreenNames } from '../../routes/main';
import { globalStyle } from '../../styles';

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
      <View style={globalStyle.spacerSmall} />
      <Button
        label="Search"
        type="secondary"
        icon="magnify"
        onPress={() =>
          navigation.navigate(ScreenNames.SearchResults, {
            phrase: search,
          })
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});

export default SearchScreen;
