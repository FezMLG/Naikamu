import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  DownloadListScreen,
  DownloadSeriesEpisodesScreen,
} from '../../../../screens';
import { defaultSubHeaderOptions } from '../../defaultSubHeaderOptions';

import {
  DownloadStackParameterList,
  DownloadStackScreenNames,
} from './interface';

const Stack = createNativeStackNavigator<DownloadStackParameterList>();

export function DownloadStack() {
  return (
    <Stack.Navigator initialRouteName={DownloadStackScreenNames.List}>
      <Stack.Screen
        component={DownloadListScreen}
        name={DownloadStackScreenNames.List}
        options={{
          ...defaultSubHeaderOptions({}),
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DownloadSeriesEpisodesScreen}
        name={DownloadStackScreenNames.SeriesEpisodes}
        options={({ route }) => ({
          ...defaultSubHeaderOptions({
            title: route.params.title,
          }),
        })}
      />
    </Stack.Navigator>
  );
}
