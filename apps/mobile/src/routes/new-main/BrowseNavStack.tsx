import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import NativeVideoPlayerScreen from '../../screens/series/episodes/player/VideoPlayerScreen';
import {
  BrowseScreenProps,
  defaultHeaderOptions,
  RootStackParamList,
  ScreenNames,
} from '../main';
import { useTranslate } from '../../i18n/useTranslate';
import BrowseScreen from '../../screens/BrowseScreen';
import { SeriesNavStack } from './SeriesNavStack';

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

export const BrowseNavStack = () => {
  const { translate } = useTranslate();

  return (
    <StackAuthorized.Navigator initialRouteName={ScreenNames.Browse}>
      <StackAuthorized.Screen
        name={ScreenNames.Browse}
        component={BrowseScreen}
        options={({}: BrowseScreenProps) => ({
          ...defaultHeaderOptions({
            title: translate('routes.' + ScreenNames.Browse),
          }),
          animation: 'slide_from_right',
        })}
      />
      <StackAuthorized.Screen
        name={ScreenNames.SeriesStack}
        component={SeriesNavStack}
        options={({ navigation }) => ({
          ...defaultSubHeaderOptions({}),
          headerShown: false,
          presentation: 'modal',
        })}
      />
      <StackAuthorized.Screen
        name={ScreenNames.WatchNative}
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
