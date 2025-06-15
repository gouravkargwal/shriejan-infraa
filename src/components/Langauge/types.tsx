export type Language = "en" | "es" | "fr";

export interface LanguageSelectionModalProps {
  isVisible: boolean;
  onSelectLanguage: (lang: Language) => void;
  t: (key: keyof (typeof translations)["en"]) => string; // Translation function
}

export interface LanguageSwitcherProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  t: (key: keyof (typeof translations)["en"]) => string; // Translation function
}
