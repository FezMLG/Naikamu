import React from 'react';

import { StyleSheet } from 'react-native';

import { ContinueWatchingList, PageLayout, useLayout } from '../components';
import { HomeStackHomeScreenProps } from '../routes';

export function HomeScreen({}: HomeStackHomeScreenProps) {
  const layout = useLayout();

  return (
    <PageLayout.Default style={[styles.container]} {...layout}>
      <ContinueWatchingList />
    </PageLayout.Default>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
  },
});
