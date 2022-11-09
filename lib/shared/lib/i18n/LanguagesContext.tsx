import React from "react";

export interface LanguagesContextType {
  t: (key: string, data?: Record<string, unknown>) => string;
  i18n: Record<string, unknown>;
}

const LanguagesContext = React.createContext<LanguagesContextType>({
  t: () => "",
  i18n: {},
});

export default LanguagesContext;
