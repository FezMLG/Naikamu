import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { PageLayout, useLayout } from '../components';
import { HomeStackHomeScreenProps } from '../routes';

export function HomeScreen({}: HomeStackHomeScreenProps) {
  const layout = useLayout();

  return (
    <PageLayout.Default style={[styles.container]} {...layout}>
      <View>
        <Text>Home Screen</Text>
      </View>
    </PageLayout.Default>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
  },
});
