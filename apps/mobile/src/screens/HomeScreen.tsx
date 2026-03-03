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
    <PageLayout.SafeView style={[styles.container]}>
      <HomeUpdateAlert />
      <ContinueWatchingSection />
      <MostPopularSection />
    </PageLayout.SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
});
