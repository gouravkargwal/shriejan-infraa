"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  const currentLang = i18n.language; // Get current language from i18n instance
  const availableLanguages = i18n.languages; // Get all configured languages

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setShowDropdown(false);
  };

  return (
    <div className="relative inline-block text-left z-20">
      <div>
        <button
          type="button"
          className="inline-flex justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors duration-200"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {currentLang.toUpperCase()}
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {showDropdown && (
        <div
          className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
          onBlur={() => setShowDropdown(false)} // Close on blur
        >
          <div className="py-1" role="none">
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentLang === lang
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                } transition-colors duration-200`}
                role="menuitem"
                tabIndex={-1}
              >
                {t(`languages.${lang}`)}{" "}
                {/* Use translation for language names */}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
