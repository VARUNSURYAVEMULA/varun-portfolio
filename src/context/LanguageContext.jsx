import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const useTranslation = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('i18n-language');
      if (saved && translations[saved]) {
        return saved;
      }
    } catch (e) {
      console.warn("Could not read language from local storage");
    }
    const browserLang = navigator.language.split('-')[0];
    if (translations[browserLang]) {
      return browserLang;
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('i18n-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
      value = value[k];
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
