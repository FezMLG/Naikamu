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
import { BrowsePageProps, RootStackParamList, RoutesNames } from './interfaces';
import SearchPage from '../pages/search/SearchPage';
import SearchResultsPage from '../pages/search/SearchResultsPage';
import { useTranslate } from '../i18n/useTranslate';

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

const StackAuthorized = createNativeStackNavigator<RootStackParamList>();

const Routes = ({ theme }: any) => {
  const { translate } = useTranslate();

  return (
    <NavigationContainer
      linking={linking}
      fallback={<SplashPage />}
      theme={theme}>
      <StackAuthorized.Navigator>
        <StackAuthorized.Screen
          name={RoutesNames.Home}
          component={HomePage}
          options={{
            ...defaultOptions({ title: RoutesNames.Home }),
            animation: 'slide_from_right',
            headerShown: false,
          }}
        />
        <StackAuthorized.Screen
          name={RoutesNames.Browse}
          component={BrowsePage}
          options={({ navigation }: BrowsePageProps) => ({
            ...defaultOptions({
              title: translate('routes.' + RoutesNames.Browse),
            }),
            animation: 'slide_from_right',
            headerBackVisible: false,
            // Add a placeholder button without the `onPress` to avoid flicker
            headerRight: () => (
              <IconButton
                icon="magnify"
                size={24}
                onPress={() => navigation.navigate(RoutesNames.Search)}
              />
            ),
          })}
        />
        <StackAuthorized.Screen
          name={RoutesNames.Search}
          component={SearchPage}
          options={{
            ...defaultOptions({ title: RoutesNames.Search }),
            animation: 'slide_from_right',
          }}
        />
        <StackAuthorized.Screen
          name={RoutesNames.SearchResults}
          component={SearchResultsPage}
          options={{
            ...defaultOptions({ title: RoutesNames.SearchResults }),
            animation: 'slide_from_right',
          }}
        />
        <StackAuthorized.Screen
          name={RoutesNames.Series}
          component={SeriesPage}
          options={({ route }: any) => ({
            ...defaultOptions({ title: route.params.title }),
            animation: 'slide_from_right',
          })}
        />
        <StackAuthorized.Screen
          name={RoutesNames.Episodes}
          component={EpisodesListPage}
          options={({ route }: any) => ({
            ...defaultOptions({
              title: `${translate('routes.' + RoutesNames.Episodes)}: ${
                route.params.title
              }`,
            }),
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
        <StackAuthorized.Screen
          name={RoutesNames.WatchNative}
          component={NativeVideoPlayerPage}
          options={{
            animation: 'slide_from_right',
            headerShown: false,
          }}
        />
        <StackAuthorized.Screen
          name={RoutesNames.WatchWebView}
          component={WebViewPlayerPage}
          options={{
            animation: 'slide_from_right',
            headerShown: false,
          }}
        />
        <StackAuthorized.Screen
          name={RoutesNames.WatchError}
          component={ErrorPlayerPage}
          options={{
            ...defaultOptions({ title: 'Go To App' }),
            animation: 'slide_from_right',
          }}
        />
      </StackAuthorized.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
