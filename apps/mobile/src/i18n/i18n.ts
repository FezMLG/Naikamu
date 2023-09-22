import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import { pl, en } from '../../../../lib/translations';

const resources = {
  pl: {
    translation: pl,
  },
  en: {
    translation: en,
  },
};

const findBestLanguage = () => {
  const fallback = { languageTag: 'pl' };
  const { languageTag } =
    RNLocalize.findBestLanguageTag(Object.keys(resources)) || fallback;

  return languageTag;
};

i18n.use(initReactI18next).init({
  lng: findBestLanguage(),
  fallbackLng: 'pl',
  resources: resources,
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
});

export { default } from 'i18next';
