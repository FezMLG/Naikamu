import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NativeVideoPlayerScreen from '../screens/series/episodes/player/VideoPlayerScreen';
import BrowseScreen from '../screens/BrowseScreen';
import SeriesScreen from '../screens/series/SeriesScreen';
import EpisodesListScreen from '../screens/series/episodes/EpisodesListScreen';
import WebViewPlayerScreen from '../screens/series/episodes/player/WebViewPlayerScreen';
import HomeScreen from '../screens/HomeScreen';
import ErrorPlayerScreen from '../screens/series/episodes/player/ErrorPlayerScreen';
import { IconButton } from 'react-native-paper';
import GoogleCast from 'react-native-google-cast';
import { BrowsePageProps, RootStackParamList, RoutesNames } from './interfaces';
import SearchScreen from '../screens/search/SearchScreen';
import SearchResultsScreen from '../screens/search/SearchResultsScreen';
import { useTranslate } from '../i18n/useTranslate';

const defaultOptions = ({ title }: { title?: string }) => {
  return {
    title: title,
  };
};

const StackAuthorized = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
  const { translate } = useTranslate();

  return (
    <StackAuthorized.Navigator>
      <StackAuthorized.Screen
        name={RoutesNames.Home}
        component={HomeScreen}
        options={{
          ...defaultOptions({ title: RoutesNames.Home }),
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />
      <StackAuthorized.Screen
        name={RoutesNames.Browse}
        component={BrowseScreen}
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
        component={SearchScreen}
        options={{
          ...defaultOptions({ title: RoutesNames.Search }),
          animation: 'slide_from_right',
        }}
      />
      <StackAuthorized.Screen
        name={RoutesNames.SearchResults}
        component={SearchResultsScreen}
        options={{
          ...defaultOptions({ title: RoutesNames.SearchResults }),
          animation: 'slide_from_right',
        }}
      />
      <StackAuthorized.Screen
        name={RoutesNames.Series}
        component={SeriesScreen}
        options={({ route }: any) => ({
          ...defaultOptions({ title: route.params.title }),
          animation: 'slide_from_right',
        })}
      />
      <StackAuthorized.Screen
        name={RoutesNames.Episodes}
        component={EpisodesListScreen}
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
        component={NativeVideoPlayerScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />
      <StackAuthorized.Screen
        name={RoutesNames.WatchWebView}
        component={WebViewPlayerScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />
      <StackAuthorized.Screen
        name={RoutesNames.WatchError}
        component={ErrorPlayerScreen}
        options={{
          ...defaultOptions({ title: 'Go To App' }),
          animation: 'slide_from_right',
        }}
      />
    </StackAuthorized.Navigator>
  );
};

export default HomeStack;
