import React, { ReactNode } from 'react';
import { withTranslation } from 'react-i18next';
import './i18n';
import LanguagesContext, { LanguagesContextType } from './LanguagesContext';

interface LanguageProviderType extends LanguagesContextType {
  children: ReactNode;
}

const LanguagesProvider = (props: LanguageProviderType) => {
  const { t, i18n, children } = props;

  return (
    <LanguagesContext.Provider value={{ t, i18n }}>
      {children}
    </LanguagesContext.Provider>
  );
};

export default withTranslation()(LanguagesProvider);
