import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocalStorage } from './utils/storage';

import translationEN from './locales/en.json';
import translationFR from './locales/fr.json';
import translationHI from './locales/hi.json';

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  hi: {
    translation: translationHI,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: getLocalStorage('lang') || 'en', // Default language
  fallbackLng: 'en', // fallback language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
