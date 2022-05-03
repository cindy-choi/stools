import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ko from '@/locales/ko';
import en from '@/locales/en';

i18n.use(initReactI18next).init({
  resources: {
    ko: { translation: ko, },
    en: { translation: en, },
  },
  lng: 'en',
  fallbackLng: {
    default: ['en'],
  },
  debug: false,
  defaultNS: 'translation',
  ns: 'translation',
  keySeparator: false,
  interpolation: { escapeValue: false, },
  react: { useSuspense: false, },
});

export default i18n;
