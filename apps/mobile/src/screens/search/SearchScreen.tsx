import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from '../../components';

import { globalStyle } from '../../styles';
import {
  SearchStackScreenNames,
  SearchStackSearchScreenProps,
} from '../../routes/';

export const SearchScreen = ({ navigation }: SearchStackSearchScreenProps) => {
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
          navigation.navigate(SearchStackScreenNames.SearchResults, {
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
