import React from 'react';

import { StyleSheet } from 'react-native';

import {
  ContinueWatchingSection,
  HomeUpdateAlert,
  MostPopularSection,
  PageLayout,
} from '../components';
import { HomeStackHomeScreenProps } from '../routes';

export function HomeScreen({}: HomeStackHomeScreenProps) {
  return (
    <PageLayout.Default style={[styles.container]}>
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
