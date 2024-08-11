import React from 'react';

import { StyleSheet } from 'react-native';

import {
  ContinueWatchingSection,
  HomeUpdateAlert,
  MostPopularSection,
  PageLayout,
  useLayout,
} from '../components';
import { HomeStackHomeScreenProps } from '../routes';

export function HomeScreen({}: HomeStackHomeScreenProps) {
  const layout = useLayout();

  return (
    <PageLayout.Default style={[styles.container]} {...layout}>
      <HomeUpdateAlert />
      <ContinueWatchingSection />
      <MostPopularSection />
    </PageLayout.Default>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
});
