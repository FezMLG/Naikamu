import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import pl from '../../../../translations/pl/pl.json';
import en from '../../../../translations/pl/pl.json';

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
    RNLocalize.findBestAvailableLanguage(Object.keys(resources)) || fallback;

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

export default i18n;
