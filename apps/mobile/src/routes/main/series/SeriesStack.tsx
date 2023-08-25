import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  SeriesStackParamList,
  SeriesStackScreenNames,
} from './series.interfaces';
import { useTranslate } from '../../../i18n/useTranslate';
import { EpisodesListScreen, SeriesScreen } from '../../../screens';
import { defaultSubHeaderOptions } from '../defaultSubHeaderOptions';

const StackAuthorized = createNativeStackNavigator<SeriesStackParamList>();

export const SeriesStack = () => {
  const { translate } = useTranslate();

  return (
    <StackAuthorized.Navigator initialRouteName={SeriesStackScreenNames.Series}>
      <StackAuthorized.Screen
        name={SeriesStackScreenNames.Series}
        component={SeriesScreen}
        options={() => ({
          ...defaultSubHeaderOptions({}),
          headerShown: false,
        })}
      />
      <StackAuthorized.Screen
        name={SeriesStackScreenNames.Episodes}
        component={EpisodesListScreen}
        options={({ navigation, route }) => ({
          ...defaultSubHeaderOptions({
            title: `${translate(
              'routes.' + SeriesStackScreenNames.Episodes,
            )}: ${route.params.title}`,
          }),
          headerLeft: () => (
            <Icon
              name="chevron-left"
              size={30}
              color={'white'}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
    </StackAuthorized.Navigator>
  );
};
