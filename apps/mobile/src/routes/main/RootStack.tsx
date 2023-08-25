import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BrowseStackScreenNames } from './browse';
import { useTranslate } from '../../i18n/useTranslate';
import { NativeVideoPlayerScreen } from '../../screens';
import { defaultHeaderOptions } from './defaultHeaderOptions';
import { SeriesStack } from './series';
import { defaultSubHeaderOptions } from './defaultSubHeaderOptions';
import { RootStackParamList, RootStackScreenNames } from './root.interfaces';
import { BottomTabStack } from './BottomTabStack';

const StackAuthorized = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { translate } = useTranslate();

  return (
    <StackAuthorized.Navigator
      initialRouteName={RootStackScreenNames.Main}
      screenOptions={{
        headerShown: false,
      }}>
      <StackAuthorized.Screen
        name={RootStackScreenNames.Main}
        component={BottomTabStack}
        options={() => ({
          ...defaultHeaderOptions({
            title: translate('routes.' + BrowseStackScreenNames.Browse),
          }),
          animation: 'slide_from_right',
        })}
      />
      <StackAuthorized.Screen
        name={RootStackScreenNames.SeriesStack}
        component={SeriesStack}
        options={() => ({
          ...defaultSubHeaderOptions({}),
          presentation: 'modal',
        })}
      />
      <StackAuthorized.Screen
        name={RootStackScreenNames.NativePlayer}
        component={NativeVideoPlayerScreen}
        options={{
          ...defaultSubHeaderOptions({}),
          autoHideHomeIndicator: true,
          presentation: 'fullScreenModal',
        }}
      />
    </StackAuthorized.Navigator>
  );
};
