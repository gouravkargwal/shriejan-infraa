// i18n/index.ts
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import type { i18n as I18nType, TFunction } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";

import { getOptions, defaultNS } from "./settings"; // <<< Import defaultNS

const importTranslation = (language: string, namespace: string) => {
  // Now, we will always request 'translation.json' for the given language
  // The 'namespace' parameter passed here will always be 'translation' (the defaultNS)
  return import(`../public/locales/${language}/translation.json`); // <<< Changed to always load translation.json
};

export async function getTranslator(
  lng: string,
  // No longer need a configurable `ns` param if only using one file, or make it optional.
  // We'll keep it optional but default to defaultNS
  ns: string | string[] = defaultNS,
  options: { keyPrefix?: string } = {}
): Promise<{ t: TFunction; i18n: I18nType }> {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend(importTranslation))
    // Pass defaultNS here if you want to ensure it always uses the single translation file
    .init(getOptions(lng, defaultNS)); // <<< Always pass defaultNS

  return {
    t: i18nInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: i18nInstance,
  };
}
