// i18n/settings.ts

export const fallbackLng = "en";
export const languages = [fallbackLng, "hi"];
export const defaultNS = "translation"; // <<< Set default namespace to 'translation'
export const cookieName = "i18next";

export function getOptions(
  lng: string = fallbackLng,
  ns: string | string[] = defaultNS
) {
  return {
    debug: process.env.NODE_ENV === "development",
    supportedLngs: languages,
    fallbackLng,
    lng,
    ns, // This will default to 'translation' unless overridden
    defaultNS,
    fallbackNS: defaultNS,
    interpolation: {
      escapeValue: false,
    },
    react: { useSuspense: false },
  };
}
