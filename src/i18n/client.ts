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
  const { t, i18n } = useTranslationOrg(ns || defaultNS, options);

  useEffect(() => {
    if (lng && i18n.resolvedLanguage !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  useEffect(() => {
    const i18nextCookie = getCookie(cookieName);
    if (i18nextCookie !== i18n.resolvedLanguage) {
      setCookie(cookieName, i18n.resolvedLanguage || "", {
        path: "/",
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      });
    }
  }, [i18n.resolvedLanguage]);

  return { t, i18n };
}
