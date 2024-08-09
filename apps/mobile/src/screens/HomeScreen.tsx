import React from 'react';

import { StyleSheet, View } from 'react-native';

import {
  Alert,
  ContinueWatchingList,
  PageLayout,
  useLayout,
} from '../components';
import { HomeStackHomeScreenProps } from '../routes';
import { globalStyle } from '../styles';

export function HomeScreen({}: HomeStackHomeScreenProps) {
  const layout = useLayout();

  return (
    <PageLayout.Default style={[styles.container]} {...layout}>
      <View style={globalStyle.marginBottom}>
        <Alert
          message="New update is aviable for download. Press this message to go to download page."
          onPress={() => {}}
          title="Update Aviable!"
        />
      </View>
      <ContinueWatchingList />
    </PageLayout.Default>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
});
