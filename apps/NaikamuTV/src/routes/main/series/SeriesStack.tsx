import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { EpisodesListScreen, SeriesScreen } from '../../../screens/series';

import {
  SeriesStackParameterList as SeriesStackParameterList,
  SeriesStackScreenNames,
} from './series.interfaces';

const StackAuthorized = createNativeStackNavigator<SeriesStackParameterList>();

export function SeriesStack() {
  return (
    <StackAuthorized.Navigator
      initialRouteName={SeriesStackScreenNames.Series}
      screenOptions={{
        headerShown: false,
      }}>
      <StackAuthorized.Screen
        component={SeriesScreen}
        name={SeriesStackScreenNames.Series}
      />
      <StackAuthorized.Screen
        component={EpisodesListScreen}
        name={SeriesStackScreenNames.Episodes}
      />
    </StackAuthorized.Navigator>
  );
}
