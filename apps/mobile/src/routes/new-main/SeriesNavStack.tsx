import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SeriesScreen from '../../screens/series/SeriesScreen';
import EpisodesListScreen from '../../screens/series/episodes/EpisodesListScreen';
import { RootStackParamList, ScreenNames } from '../main';
import { useTranslate } from '../../i18n/useTranslate';

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

const StackAuthorized = createNativeStackNavigator<RootStackParamList>();

export const SeriesNavStack = () => {
  const { translate } = useTranslate();

  return (
    <StackAuthorized.Navigator initialRouteName={ScreenNames.Series}>
      <StackAuthorized.Screen
        name={ScreenNames.Series}
        component={SeriesScreen}
        options={({ navigation }) => ({
          ...defaultSubHeaderOptions({}),
          headerShown: false,
        })}
      />
      <StackAuthorized.Screen
        name={ScreenNames.Episodes}
        component={EpisodesListScreen}
        options={({ navigation, route }) => ({
          ...defaultSubHeaderOptions({
            title: `${translate('routes.' + ScreenNames.Episodes)}: ${
              route.params.title
            }`,
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
