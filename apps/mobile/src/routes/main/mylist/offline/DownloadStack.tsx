import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OfflineSeriesEpisodesScreen from '../../../../screens/mylist/OfflineSeriesEpisodesScreen';
import { DownloadStackParamList, DownloadStackScreenNames } from './interface';
import OfflineScreen from '../../../../screens/mylist/OfflineScreen';
import { defaultSubHeaderOptions } from '../../defaultSubHeaderOptions';

const Stack = createNativeStackNavigator<DownloadStackParamList>();

export const DownloadStack = () => {
  return (
    <Stack.Navigator initialRouteName={DownloadStackScreenNames.List}>
      <Stack.Screen
        name={DownloadStackScreenNames.List}
        component={OfflineScreen}
        options={{
          ...defaultSubHeaderOptions({}),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={DownloadStackScreenNames.SeriesEpisodes}
        component={OfflineSeriesEpisodesScreen}
        options={({ route }) => ({
          ...defaultSubHeaderOptions({
            title: route.params.title,
          }),
        })}
      />
    </Stack.Navigator>
  );
};
