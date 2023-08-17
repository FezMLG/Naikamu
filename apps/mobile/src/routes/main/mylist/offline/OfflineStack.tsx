import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import OfflineSeriesEpisodesScreen from '../../../../screens/mylist/OfflineSeriesEpisodesScreen';
import { OfflineWatchParamList, OfflineWatchScreenNames } from './interface';
import OfflineScreen from '../../../../screens/mylist/OfflineScreen';

export const defaultSubHeaderOptions = ({
  title,
}: {
  title?: string;
}): NativeStackNavigationOptions => {
  return {
    title: title,
    animation: 'slide_from_right',
  };
};

const Stack = createNativeStackNavigator<OfflineWatchParamList>();

const OfflineStack = () => {
  return (
    <Stack.Navigator initialRouteName={OfflineWatchScreenNames.Offline}>
      <Stack.Screen
        name={OfflineWatchScreenNames.Offline}
        component={OfflineScreen}
        options={{
          ...defaultSubHeaderOptions({}),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={OfflineWatchScreenNames.OfflineEpisodes}
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

export default OfflineStack;
