import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { defaultSubHeaderOptions } from '../../defaultSubHeaderOptions';
import { DownloadStackParamList, DownloadStackScreenNames } from './interface';
import {
  DownloadListScreen,
  DownloadSeriesEpisodesScreen,
  NativeVideoPlayerScreen,
} from '../../../../screens';
import { BrowseStackScreenNames } from '../../browse';

const Stack = createNativeStackNavigator<DownloadStackParamList>();

export const DownloadStack = () => {
  return (
    <Stack.Navigator initialRouteName={DownloadStackScreenNames.List}>
      <Stack.Screen
        name={DownloadStackScreenNames.List}
        component={DownloadListScreen}
        options={{
          ...defaultSubHeaderOptions({}),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={DownloadStackScreenNames.SeriesEpisodes}
        component={DownloadSeriesEpisodesScreen}
        options={({ route }) => ({
          ...defaultSubHeaderOptions({
            title: route.params.title,
          }),
        })}
      />
    </Stack.Navigator>
  );
};
