import React from 'react';

import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import {
  DarkTheme as NavigationDarkTheme,
  Theme,
} from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
// eslint-disable-next-line import/default
import codePush from 'react-native-code-push';
import { default as Config } from 'react-native-config';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  MD3DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { QueryClientWrap } from './api/QueryClientWrap';
import LanguagesProvider from './i18n/LanguagesProvider';
import Routes from './routes/Routes';
import EventProvider from './services/events/EventProvider';
import { colors } from './styles';

Sentry.init({
  dsn: 'https://bd2c8809bfbed36fe09962e13c96de20@o4506020904697856.ingest.sentry.io/4506020907057152',
  environment: Config.ENV,
});

const CombinedDarkTheme: Theme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: colors.accent.color,
  },
};

function Main() {
  return (
    <QueryClientWrap>
      <PaperProvider
        settings={{
          icon: props => <Icon {...props} />,
        }}
        theme={CombinedDarkTheme}>
        <GluestackUIProvider colorMode="dark" config={config}>
          <LanguagesProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <EventProvider>
                <Routes theme={CombinedDarkTheme} />
              </EventProvider>
            </GestureHandlerRootView>
          </LanguagesProvider>
        </GluestackUIProvider>
      </PaperProvider>
    </QueryClientWrap>
  );
}

const App = codePush(Main);

export default App;
