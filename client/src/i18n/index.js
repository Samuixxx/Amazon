import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en.json';
import it from './it.json';
import fr from './fr.json';
import de from './de.json';
import es from './es.json';
import cn from './cn.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      it: { translation: it },
      fr: { translation: fr },
      de: { translation: de },
      es: { translation: es },
      cn: { translation: cn },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['navigator', 'htmlTag'],
      caches: [],
    },
  });

export default i18n;
export const languages = ["en", "it", "fr", "de", "es", "zh"];
