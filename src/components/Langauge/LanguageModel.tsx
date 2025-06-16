"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface LanguageSelectionModalProps {
  isVisible: boolean;
  onLanguageSelected: () => void;
}

const LanguageSelectionModal: React.FC<LanguageSelectionModalProps> = ({
  isVisible,
  onLanguageSelected,
}) => {
  const { i18n, t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState<string>(
    i18n.language || "en"
  ); // Default to current or 'en'

  if (!isVisible) return null;

  const handleSavePreference = () => {
    i18n.changeLanguage(selectedLang); // Change language via i18n
    localStorage.setItem("user_explicitly_selected_language", "true"); // Flag to prevent future popups
    onLanguageSelected(); // Close modal
  };

  return (
    // Overlay: Fixed, covers screen, centers content
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm p-4 overflow-y-auto">
      {" "}
      {/* Added p-4 and overflow-y-auto */}
      {/* Modal Content: White box, max-width, auto margins for centering */}
      <div className="relative bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-xs sm:max-w-md mx-auto my-auto transform scale-95 animate-scale-in">
        {" "}
        {/* Changed max-w-sm to max-w-xs for smaller screens, added my-auto */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-inter">
          {t("languageModal.selectLanguage")}
        </h2>
        <p className="text-gray-700 mb-6 font-inter">
          {t("languageModal.welcomeMessage")}
        </p>
        <div className="mb-6">
          <label htmlFor="language-select" className="sr-only">
            {t("languageModal.chooseLangPrompt")}
          </label>
          <select
            id="language-select"
            className="block w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base font-inter"
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
          >
            {/* Ensure language names are not excessively long */}
            {i18n.languages.map((lang) => (
              <option key={lang} value={lang}>
                {t(`languages.${lang}`)}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSavePreference}
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transform hover:-translate-y-0.5 transition duration-300 ease-in-out text-lg font-semibold font-inter"
        >
          {t("languageModal.savePreference")}
        </button>
      </div>
    </div>
  );
};

export default LanguageSelectionModal;
