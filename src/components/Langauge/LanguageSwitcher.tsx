"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlobeSimple, CaretDown } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { languages } from "../../i18n/settings"; // Access supported languages from settings
import { useTranslation } from "../../i18n/client";

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

const LanguageSwitcher: React.FC = () => {
  const pathname = usePathname();

  const currentUrlLng = pathname.split("/")[1];
  const { i18n, t } = useTranslation(currentUrlLng, "common");

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = i18n.language;

  const sortedAvailableLanguages = [...languages]
    .filter(
      (lang) => lang !== "cimode" // Filter out cimode
    )
    .sort((a, b) => {
      if (a === "en") return -1; // 'en' comes first
      if (b === "en") return 1; // 'en' comes first
      return a.localeCompare(b);
    });

  const getPathForLang = (targetLang: string) => {
    const segments = pathname.split("/");
    segments[1] = targetLang;
    return segments.join("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="relative inline-block text-left z-20" ref={dropdownRef}>
      {/* Language Toggle Button */}
      <div>
        <button
          type="button"
          className="inline-flex justify-center items-center gap-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm
                     hover:bg-gray-100 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                     transition-all duration-200 ease-in-out"
          id="language-menu-button"
          aria-expanded={showDropdown}
          aria-haspopup="true"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <GlobeSimple size={20} className="text-gray-500" />
          {currentLang?.toUpperCase()}
          <motion.div
            animate={{ rotate: showDropdown ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <CaretDown size={16} className="text-gray-400" />
          </motion.div>
        </button>
      </div>

      {/* Language Dropdown Menu */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="language-menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              {/* Use the sorted array here */}
              {sortedAvailableLanguages.map(
                (
                  lang // <<< Changed to sortedAvailableLanguages
                ) => (
                  <Link
                    key={lang}
                    href={getPathForLang(lang)}
                    onClick={() => setShowDropdown(false)}
                    className={`block w-full text-left px-4 py-2 text-base font-medium
                    ${
                      currentLang === lang
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }
                    transition-colors duration-150 ease-in-out`}
                    role="menuitem"
                  >
                    {t(`common.languages.${lang}`)}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
