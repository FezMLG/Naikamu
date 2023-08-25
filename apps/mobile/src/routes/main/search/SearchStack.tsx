import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTranslate } from '../../../i18n/useTranslate';
import { defaultHeaderOptions } from '../defaultHeaderOptions';
import { defaultSubHeaderOptions } from '../defaultSubHeaderOptions';
import { SeriesStack } from '../series';
import { BrowseScreen, NativeVideoPlayerScreen } from '../../../screens';
import {
  SearchStackParamList,
  SearchStackScreenNames,
} from './search.interfaces';
import { BrowseStackScreenNames } from '../browse';
import { SearchResultsScreen, SearchScreen } from '../../../screens/search';

const StackAuthorized = createNativeStackNavigator<SearchStackParamList>();

export const SearchStack = () => {
  const { translate } = useTranslate();

  return (
    <StackAuthorized.Navigator initialRouteName={SearchStackScreenNames.Search}>
      <StackAuthorized.Screen
        name={SearchStackScreenNames.Search}
        component={SearchScreen}
        options={() => ({
          ...defaultHeaderOptions({
            title: translate('routes.' + SearchStackScreenNames.Search),
          }),
          animation: 'slide_from_right',
        })}
      />
      <StackAuthorized.Screen
        name={SearchStackScreenNames.SearchResults}
        component={SearchResultsScreen}
        options={() => ({
          ...defaultSubHeaderOptions({}),
          headerShown: false,
        })}
      />
    </StackAuthorized.Navigator>
  );
};
