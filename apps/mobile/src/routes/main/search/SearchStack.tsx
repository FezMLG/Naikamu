import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTranslate } from '../../../i18n/useTranslate';
import { SearchResultsScreen, SearchScreen } from '../../../screens/search';
import { defaultHeaderOptions } from '../defaultHeaderOptions';
import { defaultSubHeaderOptions } from '../defaultSubHeaderOptions';

import {
  SearchStackParameterList,
  SearchStackScreenNames,
} from './search.interfaces';

const StackAuthorized = createNativeStackNavigator<SearchStackParameterList>();

export function SearchStack() {
  const { translate } = useTranslate();

  return (
    <StackAuthorized.Navigator initialRouteName={SearchStackScreenNames.Search}>
      <StackAuthorized.Screen
        component={SearchScreen}
        name={SearchStackScreenNames.Search}
        options={() => ({
          ...defaultHeaderOptions({
            title: translate('routes.' + SearchStackScreenNames.Search),
          }),
          animation: 'slide_from_right',
        })}
      />
      <StackAuthorized.Screen
        component={SearchResultsScreen}
        name={SearchStackScreenNames.SearchResults}
        options={() => ({
          ...defaultSubHeaderOptions({}),
          headerShown: false,
        })}
      />
    </StackAuthorized.Navigator>
  );
}
