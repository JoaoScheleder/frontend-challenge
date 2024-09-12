import React, { createContext, useContext, useState, ReactNode } from 'react';
import { setLocale as setGlobalLocale, getLocale as getGlobalLocale } from '../i18n';
import { Locale } from '@/translation';

interface LanguageContextProps {
  locale: Locale;
  changeLanguage: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(getGlobalLocale());

  const changeLanguage = (newLocale: Locale) => {
    setGlobalLocale(newLocale);
    setLocaleState(newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};