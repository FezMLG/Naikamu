import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NativeVideoPlayerPage from '../pages/series/episodes/player/VideoPlayerPage';
import BrowsePage from '../pages/BrowsePage';
import SeriesPage from '../pages/series/SeriesPage';
import EpisodesListPage from '../pages/series/episodes/EpisodesListPage';
import WebViewPlayerPage from '../pages/series/episodes/player/WebViewPlayerPage';
import HomePage from '../pages/HomePage';
import ErrorPlayerPage from '../pages/series/episodes/player/ErrorPlayerPage';
import { IconButton } from 'react-native-paper';
import GoogleCast from 'react-native-google-cast';
import SplashPage from '../pages/SplashPage';
import { RootStackParamList, RoutesNames } from './interfaces';

const linking = {
  prefixes: ['aniwatch://'],
  config: {
    screens: {
      [RoutesNames.Browse]: 'browse',
      [RoutesNames.Series]: 'browse/:title',
    },
  },
};

const defaultOptions = ({ title }: { title?: string }) => {
  return {
    title: title,
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = ({ theme }: any) => {
  return (
    <NavigationContainer
      linking={linking}
      fallback={<SplashPage />}
      theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name={RoutesNames.Home}
          component={HomePage}
          options={{
            ...defaultOptions({ title: RoutesNames.Home }),
            animation: 'slide_from_right',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={RoutesNames.Browse}
          component={BrowsePage}
          options={{
            ...defaultOptions({ title: RoutesNames.Browse }),
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name={RoutesNames.Series}
          component={SeriesPage}
          options={({ route }: any) => ({
            ...defaultOptions({ title: route.params.title }),
            animation: 'slide_from_right',
          })}
        />
        <Stack.Screen
          name={RoutesNames.Episodes}
          component={EpisodesListPage}
          options={({ route }: any) => ({
            ...defaultOptions({ title: `Episodes: ${route.params.title}` }),
            animation: 'slide_from_right',
            headerRight: () => (
              <IconButton
                icon="remote"
                size={24}
                onPress={() => GoogleCast.showExpandedControls()}
              />
            ),
          })}
        />
        <Stack.Screen
          name={RoutesNames.WatchNative}
          component={NativeVideoPlayerPage}
          options={{
            animation: 'slide_from_right',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={RoutesNames.WatchWebView}
          component={WebViewPlayerPage}
          options={{
            animation: 'slide_from_right',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={RoutesNames.WatchError}
          component={ErrorPlayerPage}
          options={{
            ...defaultOptions({ title: 'Go To App' }),
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
