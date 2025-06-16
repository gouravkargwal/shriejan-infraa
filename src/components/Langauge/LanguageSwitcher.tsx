"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { GlobeSimple, CaretDown } from "@phosphor-icons/react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "@/i18n/client";
import { languages } from "@/i18n/settings";

const dropdownVariants: Variants = {
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
  const router = useRouter();

  // Safely determine currentUrlLng with a fallback
  const currentUrlLng = pathname.split("/")[1] || "en"; // Use fallbackLng if path is "/"

  // Use the derived language for translation
  const { i18n, t } = useTranslation(currentUrlLng, "footer");

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use i18n.resolvedLanguage for the most accurate current language
  const currentLang = i18n.resolvedLanguage;

  // Sort the available languages
  const sortedAvailableLanguages = [...languages]
    .filter((lang) => lang !== "cimode") // Filter out 'cimode'
    .sort((a, b) => {
      if (a === "en") return -1; // 'en' comes first
      if (b === "en") return 1; // 'en' comes first
      return a.localeCompare(b); // Sort alphabetically
    });

  // Get the path for the new language
  const getPathForLang = (targetLang: string) => {
    const segments = pathname.split("/");
    if (segments.length <= 1 || segments[1] === "") {
      return `/${targetLang}${pathname}`; // Append to current path, e.g., /en/
    }
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

  const handleLanguageChange = (lang: string) => {
    const newPath = getPathForLang(lang);
    setShowDropdown(false);
    router.push(newPath); // Navigate to the new language URL
  };

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
              {sortedAvailableLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)} // Handle language change on button click
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
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
