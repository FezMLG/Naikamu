import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NativeVideoPlayerPage from '../pages/VideoPlayerPage';
import { RoutesNames } from './RoutesNames.enum';
import BrowsePage from '../pages/BrowsePage';
import SeriesPage from '../pages/series/SeriesPage';
import EpisodesListPage from '../pages/series/episodes/EpisodesListPage';
import { darkColor } from '../styles/darkMode.style';
import WebViewPlayerPage from '../pages/WebViewPlayerPage';

const defaultOptions = ({ title }: { title?: string }) => {
  return {
    title: title,
    headerStyle: { backgroundColor: darkColor.C800 },
    headerTitleStyle: {
      color: darkColor.Font,
    },
  };
};

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name={RoutesNames.Home}
          component={HomePage}
          options={{
            ...defaultOptions({ title: RoutesNames.Home }),
            animation: 'slide_from_right',
          }}
        /> */}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
