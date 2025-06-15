// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import your translation files
import enTranslation from "../public/locales/en/translation.json";
import hiTranslation from "../public/locales/hi/translation.json";

i18n
  // Detect user language (browser, localStorage, etc.)
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // Init i18next
  .init({
    debug: false, // Set to true for debugging in development
    fallbackLng: "en", // Default language if detection fails or no translation is found
    supportedLngs: ["en", "hi"], // Explicitly list supported languages
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    detection: {
      order: ["localStorage", "navigator"], // Order of language detection methods
      caches: ["localStorage"], // Cache detected language in localStorage
      lookupLocalStorage: "i18nextLng", // Key used in localStorage
      checkWhitelist: true, // Only allow detection of supportedLngs
    },
    resources: {
      en: {
        translation: enTranslation,
      },
      hi: {
        translation: hiTranslation,
      },
    },
  });

export default i18n;
