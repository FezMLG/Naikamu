import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  BrowseStackParamList,
  BrowseStackScreenNames,
} from './browse.interfaces';
import { useTranslate } from '../../../i18n/useTranslate';
import BrowseScreen from '../../../screens/BrowseScreen';
import { defaultHeaderOptions } from '../defaultHeaderOptions';
import { defaultSubHeaderOptions } from '../defaultSubHeaderOptions';
import NativeVideoPlayerScreen from '../../../screens/series/episodes/player/VideoPlayerScreen';
import { SeriesStack } from '../series';

const StackAuthorized = createNativeStackNavigator<BrowseStackParamList>();

export const BrowseStack = () => {
  const { translate } = useTranslate();

  return (
    <StackAuthorized.Navigator initialRouteName={BrowseStackScreenNames.Browse}>
      <StackAuthorized.Screen
        name={BrowseStackScreenNames.Browse}
        component={BrowseScreen}
        options={() => ({
          ...defaultHeaderOptions({
            title: translate('routes.' + BrowseStackScreenNames.Browse),
          }),
          animation: 'slide_from_right',
        })}
      />
      <StackAuthorized.Screen
        name={BrowseStackScreenNames.SeriesStack}
        component={SeriesStack}
        options={({ navigation }) => ({
          ...defaultSubHeaderOptions({}),
          headerShown: false,
          presentation: 'modal',
        })}
      />
      <StackAuthorized.Screen
        name={BrowseStackScreenNames.NativePlayer}
        component={NativeVideoPlayerScreen}
        options={{
          ...defaultSubHeaderOptions({}),
          headerShown: false,
          autoHideHomeIndicator: true,
          presentation: 'fullScreenModal',
        }}
      />
    </StackAuthorized.Navigator>
  );
};
