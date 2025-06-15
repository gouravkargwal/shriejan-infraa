// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation"; // Import usePathname from Next.js
import LanguageSwitcher from "./Langauge/LanguageSwitcher"; // Make sure path is correct
import LanguageSelectionModal from "./Langauge/LanguageModel"; // Make sure path is correct

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation(); // Destructure t from useTranslation
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const pathname = usePathname(); // Get the current path

  // Effect to check if user has explicitly selected a language before
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userExplicitlySelected = localStorage.getItem(
        "user_explicitly_selected_language"
      );
      // Show modal only if it's the first visit AND user hasn't explicitly chosen a language
      if (!userExplicitlySelected && !localStorage.getItem("i18nextLng")) {
        setShowLanguageModal(true);
      }
    }
  }, []);

  const handleModalClose = () => {
    setShowLanguageModal(false);
  };

  // Navigation Links - Updated href for /about and /contact based on previous discussion
  const navLinks = [
    { href: "/", text: t("common.home") },
    { href: "/about", text: t("common.about") }, // Changed to /about-us
    { href: "/contact", text: t("common.contact") }, // Changed to /contact-us
    { href: "/services", text: t("common.services") },
    { href: "/testimonials", text: t("common.testimonials") },
    { href: "/projects", text: t("common.projects") },
  ];

  return (
    <>
      {/* Main Header Container */}
      <header className="bg-white py-2 px-4 md:px-8 shadow-sm z-50 fixed top-0 w-full">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="font-extrabold text-gray-900 font-inter tracking-tight"
            >
              Shriejan Infraa
            </Link>
          </div>

          {/* Desktop Navigation, Language Switcher, and Desktop CTA */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10 font-inter">
            <nav className="flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    text-gray-700 text-sm hover:text-blue-600 transition duration-300 relative group py-2
                    ${
                      pathname === link.href
                        ? "text-blue-600 font-semibold"
                        : ""
                    }
                  `}
                >
                  {link.text}
                  <span
                    className={`
                      absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform transition-transform duration-300 origin-left
                      ${
                        pathname === link.href
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }
                    `}
                  ></span>
                </Link>
              ))}
            </nav>
            <LanguageSwitcher />
            <Link
              href="/get-quote"
              className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transform hover:-translate-y-0.5 transition duration-300 ease-in-out font-semibold text-sm"
            >
              {t("common.getQuote")}
            </Link>
          </div>

          {/* Mobile elements: CTA button and Hamburger/Close button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              href="/get-quote"
              className="bg-blue-600 text-white px-3 py-2 rounded-full shadow-sm hover:bg-blue-700 transition duration-300 ease-in-out text-sm font-semibold"
            >
              {t("common.getQuote")}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className={`h-6 w-6 transform transition-transform duration-300 ease-in-out ${
                  isOpen ? "rotate-90" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer - Fixed, Full Screen, Top-to-Bottom Animated */}
      <nav
        className={`
          md:hidden fixed top-0 left-0 w-full h-screen bg-white text-gray-900
          transform transition-transform duration-500 ease-in-out z-40
          ${isOpen ? "translate-y-0 shadow-2xl" : "-translate-y-full"}
          flex flex-col items-center justify-center overflow-y-auto font-inter
          py-12
        `}
      >
        <div className="flex flex-col space-y-6 w-full max-w-sm px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)} // Close menu on click
              className={`
                block font-medium text-gray-800 hover:text-blue-600 transition duration-300 py-3 text-center border-b border-gray-100 last:border-b-0
                ${pathname === link.href ? "text-blue-600 font-semibold" : ""}
              `}
            >
              {link.text}
            </Link>
          ))}
          {/* Language Switcher inside mobile drawer */}
          <div className="mt-6">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Language Selection Modal - Conditional rendering */}
      <LanguageSelectionModal
        isVisible={showLanguageModal}
        onLanguageSelected={handleModalClose}
      />
    </>
  );
};

export default Header;
