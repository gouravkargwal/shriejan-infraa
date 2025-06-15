"use client";

import i18next from "i18next";
import { useEffect } from "react";
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
} from "./settings"; // Ensure all necessary imports are here

// Initialize i18next singleton only once on the client side
if (!i18next.isInitialized) {
  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language, namespace) =>
          import(`./locales/${language}/translation.json`)
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
      preload: languages, // Preload all languages for faster client-side switching
      fallbackLng: fallbackLng, // Ensure fallbackLng is set
      defaultNS: defaultNS, // Ensure defaultNS is set
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
  // Call the original `react-i18next` useTranslation hook.
  // This hook manages the `t` function and `i18n` instance,
  // and crucially, it triggers component re-renders when i18n's state changes.
  const { t, i18n } = useTranslationOrg(ns || defaultNS, options);

  // Effect to synchronize the i18n instance's language with the `lng` prop (from URL).
  // This is vital when the URL changes (e.g., `/en/page` to `/hi/page`) via Next.js `Link`.
  useEffect(() => {
    // Only change the language if the target `lng` is valid and different from the current resolved language.
    // We removed the `ready` check here to allow `i18n.changeLanguage` to potentially run earlier,
    // which can help with immediate UI updates.
    if (lng && i18n.resolvedLanguage !== lng) {
      console.log(
        `[i18n/client.ts useEffect] Changing language from '${i18n.resolvedLanguage}' to '${lng}' based on URL.`
      );
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]); // Dependencies: `lng` (from URL) and the `i18n` instance itself

  // Effect to synchronize the i18next cookie with the resolved language.
  // This ensures the cookie always reflects the language currently active in i18next,
  // making future visits consistent.
  useEffect(() => {
    const i18nextCookie = getCookie(cookieName);
    if (i18nextCookie !== i18n.resolvedLanguage) {
      console.log(
        `[i18n/client.ts useEffect] Setting cookie from '${i18nextCookie}' to '${i18n.resolvedLanguage}'.`
      );
      setCookie(cookieName, i18n.resolvedLanguage || "", {
        path: "/",
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      }); // Cookie lasts 1 year
    }
  }, [i18n.resolvedLanguage]); // Dependencies: `i18n.resolvedLanguage` and `cookieName`

  return { t, i18n }; // Return the `t` function and `i18n` instance
}
