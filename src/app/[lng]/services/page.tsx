"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { services } from "../../../lib/serviceData";
import { useParams } from "next/navigation";
import { useTranslation } from "@/i18n/client";

const ServicesOverviewPage = () => {
  const params = useParams();
  const lng = params.lng as string;
  const { t } = useTranslation(lng);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-gray-50 font-inter min-h-screen pt-[var(--header-height)] pb-16">
      <div className="container mx-auto p-4 md:p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 mt-6 md:mt-8"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            {t("servicesPage.title")}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("servicesPage.description")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
            >
              <service.icon />
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {t(service.titleKey)}
              </h2>
              <p className="text-gray-600 mb-6 flex-grow">
                {t(service.shortDescriptionKey)}
              </p>
              <Link
                href={`/${lng}/services/${service.slug}`}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-full shadow-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300 transform hover:-translate-y-0.5"
              >
                {t("common.learnMore")}
                <svg
                  className="ml-2 -mr-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fillRule="evenodd"
                    d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* General CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: services.length * 0.1 + 0.3, duration: 0.6 }}
          className="text-center mt-20 p-8 bg-blue-50 rounded-xl shadow-inner border border-blue-100"
        >
          <h3 className="text-3xl font-bold text-blue-800 mb-4">
            {t("servicesPage.generalCta")}
          </h3>
          <p className="text-lg text-blue-700 mb-8 max-w-xl mx-auto">
            {t("contact.description")}
          </p>
          <Link
            href={`/${lng}/contact`}
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-full shadow-lg text-white bg-green-600 hover:bg-green-700 transition duration-300 transform hover:-translate-y-1"
          >
            {t("common.getQuote")}
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesOverviewPage;
