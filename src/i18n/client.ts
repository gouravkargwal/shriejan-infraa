"use client";

import i18next from "i18next";
import { useEffect, useState } from "react";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { getCookie, setCookie } from "cookies-next";

import {
  getOptions,
  languages,
  cookieName,
  defaultNS,
  fallbackLng,
} from "./settings";

// i18next initialization block
if (!i18next.isInitialized) {
  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language) => import(`./locales/${language}/translation.json`)
      )
    )
    .init({
      ...getOptions(),
      lng: undefined, // Let LanguageDetector pick up the initial language
      detection: {
        order: ["querystring", "cookie", "localStorage", "navigator"],
        caches: ["localStorage", "cookie"],
        lookupCookie: cookieName,
        lookupLocalStorage: "i18nextLng",
      },
      preload: languages,
      fallbackLng: fallbackLng,
      defaultNS: defaultNS, // Make sure this matches your translation file structure (e.g., 'translation' or 'common')
    })
    .then(() => {
      console.log("[i18n/client.ts] i18next initialized successfully.");
    })
    .catch((error) => {
      console.error("[i18n/client.ts] i18next initialization failed:", error);
    });
}

/**
 * Custom hook for client-side translation in Next.js App Router.
 * It wraps the original `useTranslationOrg` to add Next.js specific sync logic.
 *
 * @param lng The current language derived from the URL (e.g., from `params.lng` or `usePathname`).
 * @param ns The namespace(s) to use.
 * @param options i18next options.
 */
export function useTranslation(
  lng: string,
  ns?: string | string[],
  options?: { keyPrefix?: string }
) {
  // Use useTranslationOrg, which gives us the t function and i18n instance.
  // Use the provided `ns` or the `defaultNS` from settings.
  const { t, i18n } = useTranslationOrg(ns || defaultNS, options);

  // State to track if i18next is ready for the given 'lng'
  const [isReady, setIsReady] = useState(false); // <-- Added isReady state

  // Effect to change i18n's language when the 'lng' prop changes
  // This is triggered by Next.js navigation (e.g., /en/page -> /hi/page)
  useEffect(() => {
    // Only change language if a valid 'lng' is provided and it's different from i18n's resolved language
    if (lng && i18n.resolvedLanguage !== lng) {
      setIsReady(false); // Set to false before changing language, so components can show loading state
      i18n
        .changeLanguage(lng)
        .then(() => {
          setIsReady(true); // Set to true once language change is complete
          console.log(`[useTranslation] Language changed to: ${i18n.language}`); // Debug log
        })
        .catch((error) => {
          console.error("[useTranslation] Error changing language:", error);
          setIsReady(true); // Still set to true to avoid perpetual loading, but indicate error
        });
    } else if (lng && i18n.resolvedLanguage === lng && !isReady) {
      // If the language is already in sync (e.g., initial hydration), set ready immediately
      setIsReady(true);
    }
  }, [lng, i18n, isReady]); // Depend on lng, i18n, and isReady itself to properly re-evaluate

  // Effect to keep the i18next cookie in sync with the current resolved language
  // This is important for persistence across page loads and server-side detection.
  useEffect(() => {
    const i18nextCookie = getCookie(cookieName);
    // Only update cookie if it doesn't match the currently resolved language
    if (i18nextCookie !== i18n.resolvedLanguage) {
      setCookie(cookieName, i18n.resolvedLanguage || "", {
        path: "/",
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Cookie expires in 1 year
      });
      console.log(
        `[useTranslation] Cookie updated to: ${i18n.resolvedLanguage}`
      ); // Debug log
    }
  }, [i18n.resolvedLanguage]); // Depend only on resolvedLanguage to trigger when language is truly stable

  // Return the translation function, the i18n instance, and the readiness state
  return { t, i18n, isReady }; // <-- Return isReady
}
