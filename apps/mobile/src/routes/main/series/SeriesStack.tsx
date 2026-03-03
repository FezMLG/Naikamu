import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTranslate } from '../../../i18n/useTranslate';
import { EpisodesListScreen, SeriesScreen } from '../../../screens';
import { defaultSubHeaderOptions } from '../defaultSubHeaderOptions';

import {
  SeriesStackParameterList as SeriesStackParameterList,
  SeriesStackScreenNames,
} from './series.interfaces';
import { View, Platform } from 'react-native';

const StackAuthorized = createNativeStackNavigator<SeriesStackParameterList>();

export function SeriesStack() {
  const { translate } = useTranslate();

  return (
    <StackAuthorized.Navigator initialRouteName={SeriesStackScreenNames.Series}>
      <StackAuthorized.Screen
        component={SeriesScreen}
        name={SeriesStackScreenNames.Series}
        options={({ navigation }) => ({
          ...defaultSubHeaderOptions({
            title: '',
          }),
          headerTransparent: true,
          headerShadowVisible: false,
          headerLeft: () => (
            <Icon
              color="white"
              name="chevron-left"
              onPress={() => {
                navigation.goBack();
              }}
              size={30}
            />
          ),
        })}
      />
      <StackAuthorized.Screen
        component={EpisodesListScreen}
        name={SeriesStackScreenNames.Episodes}
        options={({ navigation }) => ({
          ...defaultSubHeaderOptions({
            title: `${translate('routes.' + SeriesStackScreenNames.Episodes)}`,
          }),
          headerLeft: () => (
            <Icon
              color="white"
              name="chevron-left"
              onPress={() => {
                navigation.goBack();
              }}
              size={30}
            />
          ),
        })}
      />
    </StackAuthorized.Navigator>
  );
}
