import { useContext } from 'react';

import LanguagesContext from './LanguagesContext';

export function useTranslate() {
  const { t } = useContext(LanguagesContext);

  return { translate: t };
}
