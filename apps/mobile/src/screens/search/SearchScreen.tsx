import React, { useState } from 'react';

import { StyleSheet, SafeAreaView, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { Button } from '../../components';
import {
  SearchStackScreenNames,
  SearchStackSearchScreenProps,
} from '../../routes/';
import { globalStyle } from '../../styles';

export function SearchScreen({ navigation }: SearchStackSearchScreenProps) {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={[styles.container]}>
      <TextInput
        label="Search"
        mode="outlined"
        onChangeText={text => setSearch(text)}
        value={search}
      />
      <View style={globalStyle.spacerSmall} />
      <Button
        icon="magnify"
        label="Search"
        onPress={() =>
          navigation.navigate(SearchStackScreenNames.SearchResults, {
            phrase: search,
          })
        }
        type="secondary"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});
