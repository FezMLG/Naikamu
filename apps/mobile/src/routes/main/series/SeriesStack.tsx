import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTranslate } from '../../../i18n/useTranslate';
import { EpisodesListScreen, SeriesScreen } from '../../../screens';
import { defaultSubHeaderOptions } from '../defaultSubHeaderOptions';

import {
  SeriesStackParamList as SeriesStackParameterList,
  SeriesStackScreenNames,
} from './series.interfaces';

const StackAuthorized = createNativeStackNavigator<SeriesStackParameterList>();

export function SeriesStack() {
  const { translate } = useTranslate();

  return (
    <StackAuthorized.Navigator initialRouteName={SeriesStackScreenNames.Series}>
      <StackAuthorized.Screen
        component={SeriesScreen}
        name={SeriesStackScreenNames.Series}
        options={() => ({
          ...defaultSubHeaderOptions({}),
          headerShown: false,
        })}
      />
      <StackAuthorized.Screen
        component={EpisodesListScreen}
        name={SeriesStackScreenNames.Episodes}
        options={({ navigation, route }) => ({
          ...defaultSubHeaderOptions({
            title: `${translate(
              'routes.' + SeriesStackScreenNames.Episodes,
            )}: ${route.params.title}`,
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
