"use client"; // This is CRUCIAL! It marks this as a Client Component.

import { I18nextProvider } from "react-i18next";
import i18n from "../../lib/i18n"; // Import your i18n config

interface I18nProviderProps {
  children: React.ReactNode;
}

const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nProvider;
