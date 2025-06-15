import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import type { i18n as I18nType, TFunction } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";

import { getOptions, defaultNS } from "./settings";

const importTranslation = (language: string) => {
  return import(`./locales/${language}/translation.json`);
};

export async function getTranslator(
  lng: string,
  ns: string | string[] = defaultNS,
  options: { keyPrefix?: string } = {}
): Promise<{ t: TFunction; i18n: I18nType }> {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend(importTranslation))
    .init(getOptions(lng, defaultNS));

  return {
    t: i18nInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: i18nInstance,
  };
}
